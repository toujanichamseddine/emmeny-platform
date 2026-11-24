package com.emmeny.platform.identity.service;

import java.time.Instant;
import java.util.Locale;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.emmeny.platform.identity.api.CustomerAccountResponse;
import com.emmeny.platform.identity.api.RegistrationRequest;
import com.emmeny.platform.identity.model.CustomerAccount;
import com.emmeny.platform.identity.model.CustomerAccount.AccountStatus;
import com.emmeny.platform.identity.model.CustomerAccount.WorkspaceType;
import com.emmeny.platform.identity.model.CompanyProfile;
import com.emmeny.platform.identity.repository.CustomerAccountRepository;

@Service
public class CustomerRegistrationService {

    private final CustomerAccountRepository accounts;
    private final PasswordEncoder passwordEncoder;

    public CustomerRegistrationService(CustomerAccountRepository accounts, PasswordEncoder passwordEncoder) {
        this.accounts = accounts;
        this.passwordEncoder = passwordEncoder;
    }

    public CustomerAccountResponse register(RegistrationRequest request) {
        String email = request.email().trim().toLowerCase(Locale.ROOT);
        String phone = request.phone().replaceAll("[\\s()\\-]", "");

        if (accounts.existsByEmail(email) || accounts.existsByPhone(phone)) {
            throw new AccountAlreadyExistsException();
        }

        Instant now = Instant.now();
        WorkspaceType workspaceType = request.workspaceType() == null ? WorkspaceType.INDIVIDUAL : request.workspaceType();
        CompanyProfile companyProfile = workspaceType == WorkspaceType.INDIVIDUAL
                ? null
                : new CompanyProfile(blankToNull(request.companyName()), blankToNull(request.companyBusinessType()),
                        blankToNull(request.companyRegistrationNumber()), request.companyEmployeeCount());

        CustomerAccount account = new CustomerAccount(null, email, phone, passwordEncoder.encode(request.password()),
                request.firstName().trim(), request.lastName().trim(), request.birthDate(), blankToNull(request.nationalId()),
                request.governorate().trim(), request.city().trim(), blankToNull(request.address()),
                request.preferredLanguage() == null ? "fr" : request.preferredLanguage(), AccountStatus.ACTIVE, now, now,
                null, workspaceType, companyProfile);

        return CustomerAccountResponse.from(accounts.save(account));
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}