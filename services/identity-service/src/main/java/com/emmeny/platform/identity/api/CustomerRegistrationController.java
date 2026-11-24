package com.emmeny.platform.identity.api;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.emmeny.platform.identity.service.CustomerRegistrationService;
import com.emmeny.platform.identity.service.AuthenticationService;

@RestController
@RequestMapping("/api/identity/accounts")
public class CustomerRegistrationController {

    private final CustomerRegistrationService registrationService;
    private final AuthenticationService authenticationService;

    public CustomerRegistrationController(
            CustomerRegistrationService registrationService,
            AuthenticationService authenticationService) {
        this.registrationService = registrationService;
        this.authenticationService = authenticationService;
    }

    @PostMapping
    public ResponseEntity<CustomerAccountResponse> register(@Valid @RequestBody RegistrationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(registrationService.register(request));
    }

    @PutMapping("/current/vehicle")
    public CustomerAccountResponse updateVehicle(
            @CookieValue(name = "EMMENY_SESSION", required = false) String sessionToken,
            @Valid @RequestBody CustomerVehicleRequest request) {
        return authenticationService.updateVehicle(sessionToken, request);
    }
}