package com.kiran.hop_on.service;

import com.kiran.hop_on.enumType.RideStatus;
import com.kiran.hop_on.kafka.KafkaProducerService;
import com.kiran.hop_on.model.Driver;
import com.kiran.hop_on.model.Ride;
import com.kiran.hop_on.model.Rider;
import com.kiran.hop_on.repository.DriverRepository;
import com.kiran.hop_on.repository.RideRepository;
import com.kiran.hop_on.repository.RiderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RideService {

    private final RideRepository rideRepository;
    private final RiderRepository riderRepository;
    private final DriverRepository driverRepository;
    private final KafkaProducerService kafkaProducerService;

    public Ride requestRide(long riderId, String pickupLocation, String dropLocation) {
        Rider rider = riderRepository.findById(riderId)
                .orElseThrow(() -> new RuntimeException("Rider Not Found :("));

        Ride ride = new Ride();
        ride.setRider(rider);
        ride.setPickupLocation(pickupLocation);
        ride.setDropLocation(dropLocation);
        ride.setStatus(RideStatus.REQUESTED);
        ride.setRequestedAt(LocalDateTime.now());

        Ride savedRide = rideRepository.save(ride);
        kafkaProducerService.publishRideRequested(savedRide);

        return savedRide;

    }

    public Ride acceptRide(long rideId, long driverId) {
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        if (!driver.isAvailable()) {
            throw new RuntimeException("Driver not available");
        }

        ride.setDriver(driver);
        ride.setStatus(RideStatus.ACCEPTED);
        ride.setAcceptedAt(LocalDateTime.now());

        driver.setAvailable(false);

        Ride savedRide = rideRepository.save(ride);
        driverRepository.save(driver);

        kafkaProducerService.publishRideAccepted(savedRide);

        return savedRide;
    }


    public Ride getRideById(long rideId) {
        return rideRepository.findById(rideId).orElseThrow(() -> new RuntimeException("Ride not found"));
    }
}
