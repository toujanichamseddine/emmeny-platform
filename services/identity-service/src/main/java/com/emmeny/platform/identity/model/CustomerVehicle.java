package com.emmeny.platform.identity.model;

public record CustomerVehicle(
        String make,
        String model,
        int year,
        int mileageKm,
        VehicleStatus status) {

    public enum VehicleStatus {
        OWNED,
        FINANCED,
        LEASED,
        COMPANY
    }
}