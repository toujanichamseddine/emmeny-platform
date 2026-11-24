package com.emmeny.platform.identity.api;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import com.emmeny.platform.identity.model.CustomerVehicle.VehicleStatus;

public record CustomerVehicleRequest(
        @NotBlank @Size(max = 60) String make,
        @NotBlank @Size(max = 80) String model,
        @NotNull @Min(1950) @Max(2100) Integer year,
        @NotNull @Min(0) @Max(2_000_000) Integer mileageKm,
        @NotNull VehicleStatus status) {
}