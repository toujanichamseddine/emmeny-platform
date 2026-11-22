package com.emmeny.platform.insurance.model;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("insurance_offers")
public record InsuranceOffer(
        @Id String id,
        String insurerId,
        String insurerName,
        ProductType productType,
        String name,
        String description,
        List<Coverage> coverages,
        BigDecimal premiumAmount,
        String currency,
        String marketCountry,
        LocalDate validFrom,
        LocalDate validUntil,
        boolean active,
        Instant createdAt) {

    public enum ProductType {
        MOTOR,
        TRAVEL,
        HOME,
        HEALTH,
        OTHER
    }

    public record Coverage(String code, String name, String description, BigDecimal limit, String currency) {
    }
}