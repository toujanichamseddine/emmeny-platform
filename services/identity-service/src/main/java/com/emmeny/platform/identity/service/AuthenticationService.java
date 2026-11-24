package com.emmeny.platform.identity.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.HexFormat;
import java.util.Locale;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.emmeny.platform.identity.api.AuthenticationRequest;
import com.emmeny.platform.identity.api.CustomerVehicleRequest;
import com.emmeny.platform.identity.api.CustomerAccountResponse;
import com.emmeny.platform.identity.model.AuthenticationSession;
import com.emmeny.platform.identity.model.CustomerAccount;
import com.emmeny.platform.identity.model.CustomerAccount.AccountStatus;
import com.emmeny.platform.identity.model.CustomerVehicle;
import com.emmeny.platform.identity.repository.AuthenticationSessionRepository;
import com.emmeny.platform.identity.repository.CustomerAccountRepository;

@Service
public class AuthenticationService {

    private static final Duration SESSION_TTL = Duration.ofHours(8);
    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    private final CustomerAccountRepository accounts;
    private final AuthenticationSessionRepository sessions;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationService(
            CustomerAccountRepository accounts,
            AuthenticationSessionRepository sessions,
            PasswordEncoder passwordEncoder) {
        this.accounts = accounts;
        this.sessions = sessions;
        this.passwordEncoder = passwordEncoder;
    }

    public IssuedSession authenticate(AuthenticationRequest request) {
        String email = request.email().trim().toLowerCase(Locale.ROOT);
        CustomerAccount account = accounts.findByEmail(email)
                .filter(candidate -> candidate.status() == AccountStatus.ACTIVE)
                .filter(candidate -> passwordEncoder.matches(request.password(), candidate.passwordHash()))
                .orElseThrow(AuthenticationFailedException::new);

        byte[] tokenBytes = new byte[32];
        SECURE_RANDOM.nextBytes(tokenBytes);
        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
        Instant now = Instant.now();
        Instant expiresAt = now.plus(SESSION_TTL);

        sessions.save(new AuthenticationSession(null, account.id(), hashToken(token), now, expiresAt));
        return new IssuedSession(token, expiresAt, CustomerAccountResponse.from(account));
    }

    public CustomerAccountResponse currentCustomer(String token) {
        return CustomerAccountResponse.from(accountForSession(token));
    }

    public CustomerAccountResponse updateVehicle(String token, CustomerVehicleRequest request) {
        CustomerAccount account = accountForSession(token);
        CustomerAccount updated = new CustomerAccount(account.id(), account.email(), account.phone(),
                account.passwordHash(), account.firstName(), account.lastName(), account.birthDate(),
                account.nationalId(), account.governorate(), account.city(), account.address(),
                account.preferredLanguage(), account.status(), account.createdAt(), Instant.now(),
                new CustomerVehicle(request.make().trim(), request.model().trim(), request.year(),
                        request.mileageKm(), request.status()), account.workspaceType(), account.companyProfile());
        return CustomerAccountResponse.from(accounts.save(updated));
    }

    private CustomerAccount accountForSession(String token) {
        if (token == null || token.isBlank()) {
            throw new AuthenticationFailedException();
        }

        AuthenticationSession session = sessions.findByTokenHash(hashToken(token))
                .filter(candidate -> candidate.expiresAt().isAfter(Instant.now()))
                .orElseThrow(AuthenticationFailedException::new);

        CustomerAccount account = accounts.findById(session.accountId())
                .filter(candidate -> candidate.status() == AccountStatus.ACTIVE)
                .orElseThrow(AuthenticationFailedException::new);
        return account;
    }

    public void revoke(String token) {
        if (token != null && !token.isBlank()) {
            sessions.deleteByTokenHash(hashToken(token));
        }
    }

    private String hashToken(String token) {
        try {
            byte[] digest = MessageDigest.getInstance("SHA-256").digest(token.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(digest);
        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException("SHA-256 is required by the Java runtime.", exception);
        }
    }

    public record IssuedSession(String token, Instant expiresAt, CustomerAccountResponse customer) {
    }
}