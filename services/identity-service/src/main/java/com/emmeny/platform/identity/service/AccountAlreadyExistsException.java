package com.emmeny.platform.identity.service;

public class AccountAlreadyExistsException extends RuntimeException {

    public AccountAlreadyExistsException() {
        super("An account with this email or phone number already exists.");
    }
}