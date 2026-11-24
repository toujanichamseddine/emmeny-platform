package com.emmeny.platform.identity.api;

import java.time.Duration;
import java.time.Instant;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.emmeny.platform.identity.service.AuthenticationService;

@RestController
@RequestMapping("/api/identity/sessions")
public class AuthenticationController {

    private static final String SESSION_COOKIE = "EMMENY_SESSION";
    private static final String COOKIE_PATH = "/api/identity";

    private final AuthenticationService authenticationService;
    private final boolean secureCookie;

    public AuthenticationController(
            AuthenticationService authenticationService,
            @Value("${app.auth.cookie-secure:true}") boolean secureCookie) {
        this.authenticationService = authenticationService;
        this.secureCookie = secureCookie;
    }

    @PostMapping
    public ResponseEntity<AuthenticationResponse> authenticate(@Valid @RequestBody AuthenticationRequest request) {
        AuthenticationService.IssuedSession session = authenticationService.authenticate(request);
        ResponseCookie cookie = ResponseCookie.from(SESSION_COOKIE, session.token())
                .httpOnly(true)
                .secure(secureCookie)
                .sameSite("Lax")
                .path(COOKIE_PATH)
                .maxAge(Duration.between(Instant.now(), session.expiresAt()))
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new AuthenticationResponse(session.customer(), session.expiresAt()));
    }

    @GetMapping("/current")
    public CustomerAccountResponse current(
            @CookieValue(name = SESSION_COOKIE, required = false) String token) {
        return authenticationService.currentCustomer(token);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @CookieValue(name = SESSION_COOKIE, required = false) String token) {
        authenticationService.revoke(token);
        ResponseCookie cookie = ResponseCookie.from(SESSION_COOKIE, "")
                .httpOnly(true)
                .secure(secureCookie)
                .sameSite("Lax")
                .path(COOKIE_PATH)
                .maxAge(Duration.ZERO)
                .build();
        return ResponseEntity.noContent().header(HttpHeaders.SET_COOKIE, cookie.toString()).build();
    }
}