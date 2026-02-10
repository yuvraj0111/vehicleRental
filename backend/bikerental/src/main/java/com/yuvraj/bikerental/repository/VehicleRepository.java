package com.yuvraj.bikerental.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.yuvraj.bikerental.entity.Vehicle;

public interface VehicleRepository 
    extends JpaRepository<Vehicle, UUID>, 
            JpaSpecificationExecutor<Vehicle> {
    List<Vehicle> findBySellerId(UUID sellerId);

}
