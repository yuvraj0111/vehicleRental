package com.yuvraj.bikerental.entity;

import java.time.LocalDateTime;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    private User user;

    private String message;

    private Boolean read;

    private LocalDateTime createdAt;
}
