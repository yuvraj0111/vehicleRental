package com.yuvraj.bikerental.entity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private User buyer;

    @ManyToOne
    private Vehicle vehicle;

    private LocalDate fromDate;
    private LocalDate toDate;

    private Boolean monthlyBooking;  // true if monthly

    private Double totalPrice;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    private LocalDateTime createdAt;
}
