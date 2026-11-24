package com.emmeny.platform.identity.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

import com.emmeny.platform.identity.model.CustomerAccount;

public interface CustomerAccountRepository extends MongoRepository<CustomerAccount, String> {

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    Optional<CustomerAccount> findByEmail(String email);
}