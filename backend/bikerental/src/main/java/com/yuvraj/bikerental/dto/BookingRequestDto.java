package com.yuvraj.bikerental.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
public class BookingRequestDto {

    private UUID vehicleId;
    private UUID buyerId;
    private LocalDate fromDate;
    private LocalDate toDate;
    private Boolean monthlyBooking;
}
