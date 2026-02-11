package com.yuvraj.bikerental.controller;

import com.yuvraj.bikerental.dto.BookingRequestDto;
import com.yuvraj.bikerental.entity.*;
import com.yuvraj.bikerental.repository.*;
import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingRepository bookingRepository;
    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;

    @PreAuthorize("hasRole('BUYER')")
    @PostMapping("/request")
    public Booking requestBooking(@RequestBody BookingRequestDto dto) {

        Vehicle vehicle = vehicleRepository.findById(dto.getVehicleId())
                .orElseThrow();

        User buyer = userRepository.findById(dto.getBuyerId())
                .orElseThrow();

        long days = ChronoUnit.DAYS.between(dto.getFromDate(), dto.getToDate());

        double total;

        if (Boolean.TRUE.equals(dto.getMonthlyBooking())) {
            long months = ChronoUnit.MONTHS.between(dto.getFromDate(), dto.getToDate());
            total = months * vehicle.getMonthlyPrice();
        } else {
            total = days * vehicle.getPricePerDay();
        }

        Booking booking = Booking.builder()
                .buyer(buyer)
                .vehicle(vehicle)
                .fromDate(dto.getFromDate())
                .toDate(dto.getToDate())
                .monthlyBooking(dto.getMonthlyBooking())
                .totalPrice(total)
                .status(BookingStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();

        return bookingRepository.save(booking);
    }

    @PreAuthorize("hasRole('SELLER')")
    @PutMapping("/{id}/approve")
    public Booking approveBooking(@PathVariable UUID id) {

        User user = (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        Booking booking = bookingRepository.findById(id)
                .orElseThrow();

        if (!booking.getVehicle().getSeller().getId().equals(user.getId())) {
            throw new RuntimeException("You are not the owner of this vehicle");
        }

        booking.setStatus(BookingStatus.APPROVED);

        return bookingRepository.save(booking);
    }

    @PreAuthorize("hasRole('SELLER')")
    @PutMapping("/{id}/reject")
    public Booking rejectBooking(@PathVariable UUID id) {
        User user = (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        Booking booking = bookingRepository.findById(id)
                .orElseThrow();

        if (!booking.getVehicle().getSeller().getId().equals(user.getId())) {
            throw new RuntimeException("You are not the owner of this vehicle");
        }

        booking.setStatus(BookingStatus.REJECTED);

        return bookingRepository.save(booking);
    }

    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/seller-requests")
    public List<Booking> getSellerRequests() {

        User user = (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        return bookingRepository.findByVehicleSellerId(user.getId());
    }

    @PreAuthorize("hasRole('BUYER')")
    @GetMapping("/my-bookings")
    public List<Booking> getMyBookings() {

        User user = (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        return bookingRepository.findByBuyerId(user.getId());
    }

}
