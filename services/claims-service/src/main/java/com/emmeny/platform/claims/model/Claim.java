package com.emmeny.platform.claims.model;

import java.time.Instant;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("claims")
public record Claim(
        @Id String id,
        String policyId,
        String customerId,
        Status status,
        Instant incidentAt,
        String description,
        List<String> photoDocumentIds,
        String reportDocumentId,
        Instant createdAt) {

    public enum Status {
        DRAFT,
        SUBMITTED,
        UNDER_REVIEW,
        NEEDS_INFORMATION,
        APPROVED,
        REJECTED,
        CLOSED
    }
}