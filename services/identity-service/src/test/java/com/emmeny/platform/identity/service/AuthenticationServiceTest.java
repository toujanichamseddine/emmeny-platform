package com.emmeny.platform.identity.service;

import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.emmeny.platform.identity.api.AuthenticationRequest;
import com.emmeny.platform.identity.api.CustomerVehicleRequest;
import com.emmeny.platform.identity.model.AuthenticationSession;
import com.emmeny.platform.identity.model.CustomerAccount;
import com.emmeny.platform.identity.model.CustomerAccount.AccountStatus;
import com.emmeny.platform.identity.model.CustomerVehicle.VehicleStatus;
import com.emmeny.platform.identity.repository.AuthenticationSessionRepository;
import com.emmeny.platform.identity.repository.CustomerAccountRepository;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @Mock
    private CustomerAccountRepository accounts;

    @Mock
    private AuthenticationSessionRepository sessions;

    @Mock
    private PasswordEncoder passwordEncoder;

    private AuthenticationService authenticationService;

    @BeforeEach
    void setUp() {
        authenticationService = new AuthenticationService(accounts, sessions, passwordEncoder);
    }

    @Test
    void authenticateCreatesHashedSessionForActiveAccount() {
        when(accounts.findByEmail("amira@example.tn")).thenReturn(Optional.of(activeAccount()));
        when(passwordEncoder.matches("password123", "bcrypt-hash")).thenReturn(true);

        AuthenticationService.IssuedSession issued = authenticationService.authenticate(
                new AuthenticationRequest(" Amira@Example.tn ", "password123"));

        ArgumentCaptor<AuthenticationSession> sessionCaptor = ArgumentCaptor.forClass(AuthenticationSession.class);
        verify(sessions).save(sessionCaptor.capture());
        AuthenticationSession stored = sessionCaptor.getValue();
        assertNotEquals(issued.token(), stored.tokenHash());
        assertTrue(stored.tokenHash().matches("[a-f0-9]{64}"));
        assertTrue(issued.expiresAt().isAfter(Instant.now()));
        assertTrue(issued.customer().email().equals("amira@example.tn"));
    }

    @Test
    void authenticateRejectsInvalidPasswordWithoutCreatingSession() {
        when(accounts.findByEmail("amira@example.tn")).thenReturn(Optional.of(activeAccount()));
        when(passwordEncoder.matches("wrong-password", "bcrypt-hash")).thenReturn(false);

        assertThrows(AuthenticationFailedException.class, () -> authenticationService.authenticate(
                new AuthenticationRequest("amira@example.tn", "wrong-password")));

        verify(sessions, never()).save(any(AuthenticationSession.class));
    }

    @Test
    void revokeDeletesSessionByTokenHash() {
        authenticationService.revoke("opaque-session-token");

        ArgumentCaptor<String> hashCaptor = ArgumentCaptor.forClass(String.class);
        verify(sessions).deleteByTokenHash(hashCaptor.capture());
        assertNotEquals("opaque-session-token", hashCaptor.getValue());
        assertTrue(hashCaptor.getValue().matches("[a-f0-9]{64}"));
    }

    @Test
    void updateVehiclePersistsVehicleForAuthenticatedCustomer() {
        when(sessions.findByTokenHash(anyString())).thenReturn(Optional.of(new AuthenticationSession(
                "session-1", "account-1", "hashed-token", Instant.now(), Instant.now().plusSeconds(3600))));
        when(accounts.findById("account-1")).thenReturn(Optional.of(activeAccount()));
        when(accounts.save(any(CustomerAccount.class))).thenAnswer(invocation -> invocation.getArgument(0));

        var response = authenticationService.updateVehicle("opaque-session-token",
                new CustomerVehicleRequest("Peugeot", "208", 2022, 42000, VehicleStatus.OWNED));

        ArgumentCaptor<CustomerAccount> accountCaptor = ArgumentCaptor.forClass(CustomerAccount.class);
        verify(accounts).save(accountCaptor.capture());
        assertEquals("Peugeot", accountCaptor.getValue().vehicle().make());
        assertEquals(42000, response.vehicle().mileageKm());
    }

    private CustomerAccount activeAccount() {
        return new CustomerAccount("account-1", "amira@example.tn", "+21620000000", "bcrypt-hash", "Amira",
                "Ben Salem", LocalDate.of(1994, 6, 15), null, "Tunis", "Tunis", null, "fr",
            AccountStatus.ACTIVE, Instant.now(), Instant.now(), null,
            com.emmeny.platform.identity.model.CustomerAccount.WorkspaceType.INDIVIDUAL, null);
    }
}