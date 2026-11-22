package com.emmeny.platform.payment.model;

import java.math.BigDecimal;
import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("payment_transactions")
public record PaymentTransaction(
        @Id String id,
        String customerId,
        String relatedResourceId,
        Purpose purpose,
        Status status,
        BigDecimal amount,
        String currency,
        String provider,
        String providerTransactionReference,
        String idempotencyKey,
        Instant createdAt,
        Instant settledAt) {

    public enum Purpose {
        POLICY_PREMIUM,
        ASSISTANCE_FEE
    }

    public enum Status {
        CREATED,
        PENDING,
        SUCCEEDED,
        FAILED,
        REFUNDED
    }
}