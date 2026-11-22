package com.emmeny.platform.identity.model;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("customer_profiles")
public record CustomerProfile(
        @Id String id,
        @Indexed(unique = true) String identitySubject,
        String preferredLanguage,
        String marketCountry,
        AccountType accountType,
        Instant createdAt) {

    public enum AccountType {
        CUSTOMER,
        OPERATOR
    }
}