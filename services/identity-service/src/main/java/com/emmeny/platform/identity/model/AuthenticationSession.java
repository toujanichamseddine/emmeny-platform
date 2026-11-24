package com.emmeny.platform.identity.model;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("authentication_sessions")
@CompoundIndex(name = "account_session_idx", def = "{'accountId': 1, 'expiresAt': 1}")
public record AuthenticationSession(
        @Id String id,
        String accountId,
        @Indexed(unique = true) String tokenHash,
        Instant createdAt,
        @Indexed(expireAfter = "0s") Instant expiresAt) {
}