package com.kiran.hop_on.model;

import com.kiran.hop_on.enumType.RideStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ride {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Rider rider;

    @ManyToOne
    private Driver driver;

    private String pickupLocation;
    private String dropLocation;

    @Enumerated(EnumType.STRING)
    private RideStatus status;

    private LocalDateTime requestedAt;
    private LocalDateTime acceptedAt;
}
