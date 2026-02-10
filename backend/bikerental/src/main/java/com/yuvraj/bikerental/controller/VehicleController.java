package com.yuvraj.bikerental.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.criteria.Predicate;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yuvraj.bikerental.entity.FuelType;
import com.yuvraj.bikerental.entity.User;
import com.yuvraj.bikerental.entity.Vehicle;
import com.yuvraj.bikerental.entity.VehicleType;
import com.yuvraj.bikerental.repository.UserRepository;
import com.yuvraj.bikerental.repository.VehicleRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;

    @GetMapping("/search")
public List<Vehicle> search(
        @RequestParam String city,
        @RequestParam(required = false) FuelType fuelType,
        @RequestParam(required = false) Double minPrice,
        @RequestParam(required = false) Double maxPrice,
        @RequestParam(required = false) VehicleType vehicleType

) {

    return vehicleRepository.findAll((root, query, cb) -> {

        List<Predicate> predicates = new ArrayList<>();

        predicates.add(cb.equal(
                cb.lower(root.get("city")),
                city.toLowerCase()
        ));

        if (fuelType != null) {
            predicates.add(cb.equal(root.get("fuelType"), fuelType));
        }

        if (minPrice != null) {
            predicates.add(cb.greaterThanOrEqualTo(
                    root.get("pricePerDay"), minPrice));
        }

        if (maxPrice != null) {
            predicates.add(cb.lessThanOrEqualTo(
                    root.get("pricePerDay"), maxPrice));
        }
        if (vehicleType != null) {
            predicates.add(cb.equal(root.get("vehicleType"), vehicleType));
        }


        return cb.and(predicates.toArray(new Predicate[0]));
    });
}

@PostMapping
public Vehicle addVehicle(@RequestBody Vehicle vehicle) {

    User seller = null;
    try {
        seller = userRepository.findByEmail("rahul@gmail.com")
                .orElseThrow(() -> new RuntimeException("User not found"));
    } catch (Exception e) {
        e.printStackTrace();
    }

    vehicle.setSeller(seller);

    return vehicleRepository.save(vehicle);
}

@GetMapping("/seller/{sellerId}")
public List<Vehicle> getSellerVehicles(@PathVariable UUID sellerId) {
    return vehicleRepository.findBySellerId(sellerId);
}

@DeleteMapping("/{id}")
public void deleteVehicle(@PathVariable UUID id) {
    vehicleRepository.deleteById(id);
}

@PutMapping("/{id}")
public Vehicle updateVehicle(@PathVariable UUID id, @RequestBody Vehicle updated) {

    Vehicle vehicle = vehicleRepository.findById(id)
            .orElseThrow();

    vehicle.setTitle(updated.getTitle());
    vehicle.setDescription(updated.getDescription());
    vehicle.setFuelType(updated.getFuelType());
    vehicle.setType(updated.getType());
    vehicle.setEngineCc(updated.getEngineCc());
    vehicle.setCity(updated.getCity());
    vehicle.setPricePerDay(updated.getPricePerDay());

    return vehicleRepository.save(vehicle);
}


}
