package com.emmeny.platform.identity.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.emmeny.platform.identity.model.AuthenticationSession;

public interface AuthenticationSessionRepository extends MongoRepository<AuthenticationSession, String> {

    Optional<AuthenticationSession> findByTokenHash(String tokenHash);

    void deleteByTokenHash(String tokenHash);
}