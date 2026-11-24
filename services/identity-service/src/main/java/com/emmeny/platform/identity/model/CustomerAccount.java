package com.emmeny.platform.identity.model;

import java.time.Instant;
import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("customer_accounts")
public record CustomerAccount(
        @Id String id,
        @Indexed(unique = true) String email,
        @Indexed(unique = true) String phone,
        String passwordHash,
        String firstName,
        String lastName,
        LocalDate birthDate,
        String nationalId,
        String governorate,
        String city,
        String address,
        String preferredLanguage,
        AccountStatus status,
        Instant createdAt,
        Instant updatedAt,
        CustomerVehicle vehicle,
        WorkspaceType workspaceType,
        CompanyProfile companyProfile) {

    public enum AccountStatus {
        ACTIVE,
        SUSPENDED
    }

    public enum WorkspaceType {
        INDIVIDUAL,
        PROFESSIONAL,
        COMPANY
    }
}