package com.yuvraj.bikerental.entity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;
@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Vehicle vehicle;

    private LocalDate startDate;
    private LocalDate endDate;

    private Double totalPrice;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;
}
