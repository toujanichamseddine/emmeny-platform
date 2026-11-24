package com.emmeny.platform.identity.api;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Size;

import com.emmeny.platform.identity.model.CustomerAccount.WorkspaceType;

public record RegistrationRequest(
        @NotBlank @Email @Size(max = 254) String email,
        @NotBlank @Pattern(regexp = "^\\+?[0-9][0-9\\s()\\-]{6,19}$") String phone,
        @NotBlank @Size(min = 8, max = 72) String password,
        @NotBlank @Size(max = 80) String firstName,
        @NotBlank @Size(max = 80) String lastName,
        @NotNull @Past LocalDate birthDate,
        @Size(max = 40) String nationalId,
        @NotBlank @Size(max = 80) String governorate,
        @NotBlank @Size(max = 100) String city,
        @Size(max = 240) String address,
        @Pattern(regexp = "^(fr|en|ar)$") String preferredLanguage,
        WorkspaceType workspaceType,
        @Size(max = 160) String companyName,
        @Size(max = 80) String companyBusinessType,
        @Size(max = 40) String companyRegistrationNumber,
        @Min(1) @Max(100000) Integer companyEmployeeCount) {
}