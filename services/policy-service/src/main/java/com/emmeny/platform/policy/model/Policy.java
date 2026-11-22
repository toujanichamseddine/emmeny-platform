package com.emmeny.platform.policy.model;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("policies")
public record Policy(
        @Id String id,
        String customerId,
        String insurerId,
        String offerId,
        String insurerPolicyNumber,
        Status status,
        LocalDate effectiveFrom,
        LocalDate effectiveUntil,
        BigDecimal premiumAmount,
        String currency,
        List<String> documentIds,
        Instant createdAt) {

    public enum Status {
        DRAFT,
        PENDING_SIGNATURE,
        PENDING_PAYMENT,
        ACTIVE,
        EXPIRED,
        CANCELLED
    }
}