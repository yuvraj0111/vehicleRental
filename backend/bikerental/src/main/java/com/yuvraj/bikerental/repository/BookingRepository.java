package com.yuvraj.bikerental.repository;

import com.yuvraj.bikerental.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BookingRepository extends JpaRepository<Booking, UUID> {

    List<Booking> findByVehicleSellerId(UUID sellerId);
    List<Booking> findByBuyerId(UUID buyerId);
}
