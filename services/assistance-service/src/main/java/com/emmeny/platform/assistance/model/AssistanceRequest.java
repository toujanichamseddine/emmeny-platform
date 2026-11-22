package com.emmeny.platform.assistance.model;

import java.math.BigDecimal;
import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("assistance_requests")
public record AssistanceRequest(
        @Id String id,
        String customerId,
        String policyId,
        RequestType requestType,
        Status status,
        String description,
        BigDecimal latitude,
        BigDecimal longitude,
        Instant requestedAt,
        Instant scheduledAt) {

    public enum RequestType {
        TOWING,
        APPOINTMENT
    }

    public enum Status {
        REQUESTED,
        CONFIRMED,
        IN_PROGRESS,
        COMPLETED,
        CANCELLED
    }
}