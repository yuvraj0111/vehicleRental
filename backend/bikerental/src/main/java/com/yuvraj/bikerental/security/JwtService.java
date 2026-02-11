package com.yuvraj.bikerental.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

import javax.crypto.SecretKey;

@Service
public class JwtService {

    private final String SECRET = "your-very-secret-key-your-very-secret-key";
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(UUID userId, String email, Set<String> roles) {

        return Jwts.builder()
                .subject(email)
                .claim("userId", userId.toString())
                .claim("roles", roles)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(key)
                .compact();
    }

    public Claims extractClaims(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
