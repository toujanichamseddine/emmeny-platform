package com.emmeny.platform.identity.api;

import java.time.Instant;
import java.time.LocalDate;

import com.emmeny.platform.identity.model.CustomerAccount;
import com.emmeny.platform.identity.model.CustomerVehicle;
import com.emmeny.platform.identity.model.CustomerAccount.WorkspaceType;
import com.emmeny.platform.identity.model.CompanyProfile;

public record CustomerAccountResponse(
        String id,
        String email,
        String phone,
        String firstName,
        String lastName,
        LocalDate birthDate,
        String nationalId,
        String governorate,
        String city,
        String address,
        String preferredLanguage,
        CustomerVehicle vehicle,
        WorkspaceType workspaceType,
        CompanyProfile companyProfile,
        Instant createdAt) {

    public static CustomerAccountResponse from(CustomerAccount account) {
        return new CustomerAccountResponse(account.id(), account.email(), account.phone(), account.firstName(),
                account.lastName(), account.birthDate(), account.nationalId(), account.governorate(), account.city(),
                account.address(), account.preferredLanguage(), account.vehicle(),
                account.workspaceType(), account.companyProfile(), account.createdAt());
    }
}