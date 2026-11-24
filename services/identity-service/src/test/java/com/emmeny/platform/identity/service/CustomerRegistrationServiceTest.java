package com.emmeny.platform.identity.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.emmeny.platform.identity.api.RegistrationRequest;
import com.emmeny.platform.identity.model.CustomerAccount;
import com.emmeny.platform.identity.repository.CustomerAccountRepository;

@ExtendWith(MockitoExtension.class)
class CustomerRegistrationServiceTest {

    @Mock
    private CustomerAccountRepository accounts;

    private PasswordEncoder passwordEncoder;

    private CustomerRegistrationService registrationService;

    @BeforeEach
    void setUp() {
        passwordEncoder = new BCryptPasswordEncoder(4);
        registrationService = new CustomerRegistrationService(accounts, passwordEncoder);
    }

    @Test
    void registerNormalizesContactsAndStoresOnlyPasswordHash() {
        when(accounts.existsByEmail("amira@example.tn")).thenReturn(false);
        when(accounts.existsByPhone("+21620000000")).thenReturn(false);
        when(accounts.save(any(CustomerAccount.class))).thenAnswer(invocation -> invocation.getArgument(0));

        var response = registrationService.register(validRequest());

        var accountCaptor = org.mockito.ArgumentCaptor.forClass(CustomerAccount.class);
        verify(accounts).save(accountCaptor.capture());
        CustomerAccount stored = accountCaptor.getValue();
        assertEquals("amira@example.tn", stored.email());
        assertEquals("+21620000000", stored.phone());
        assertNotEquals("correct-horse-battery", stored.passwordHash());
        assertTrue(passwordEncoder.matches("correct-horse-battery", stored.passwordHash()));
        assertEquals("amira@example.tn", response.email());
    }

    @Test
    void registerRejectsAnExistingEmailWithoutSaving() {
        when(accounts.existsByEmail("amira@example.tn")).thenReturn(true);

        assertThrows(AccountAlreadyExistsException.class, () -> registrationService.register(validRequest()));

        verify(accounts, never()).save(any(CustomerAccount.class));
    }

    private RegistrationRequest validRequest() {
        return new RegistrationRequest(" Amira@Example.tn ", "+216 20 000 000", "correct-horse-battery",
                "Amira", "Ben Salem", LocalDate.of(1994, 6, 15), null, "Tunis", "Tunis", null, "fr",
                com.emmeny.platform.identity.model.CustomerAccount.WorkspaceType.INDIVIDUAL,
                null, null, null, null);
    }
}