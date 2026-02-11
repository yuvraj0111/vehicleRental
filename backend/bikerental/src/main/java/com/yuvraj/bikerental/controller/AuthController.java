package com.yuvraj.bikerental.controller;

import com.yuvraj.bikerental.entity.Role;
import com.yuvraj.bikerental.entity.User;
import com.yuvraj.bikerental.repository.UserRepository;
import com.yuvraj.bikerental.security.JwtService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body("Email already exists");
        }

        user.setPassword(encoder.encode(user.getPassword()));
        user.setRoles(Set.of(Role.BUYER, Role.SELLER));

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public String login(@RequestBody User request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        if (!encoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwtService.generateToken(
                user.getId(),
                user.getEmail(),
                user.getRoles().stream().map(Enum::name).collect(java.util.stream.Collectors.toSet()));
    }
}
