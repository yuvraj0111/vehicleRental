package com.yuvraj.bikerental.entity;
import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;
@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Vehicle {

    @Id
    @GeneratedValue
    private UUID id;

    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    private FuelType fuelType;

    private String city;

    private Double pricePerDay;

    @Builder.Default
    private Boolean isAvailable = true;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User seller;

    @Enumerated(EnumType.STRING)
    private VehicleType type;

    private Integer engineCc;
    private Double monthlyPrice;


}
