package com.emmeny.platform.identity.model;

public record CompanyProfile(
        String name,
        String businessType,
        String registrationNumber,
        Integer employeeCount) {
}
