package com.emmeny.platform.identity.api;

import java.time.Instant;

public record AuthenticationResponse(CustomerAccountResponse customer, Instant expiresAt) {
}