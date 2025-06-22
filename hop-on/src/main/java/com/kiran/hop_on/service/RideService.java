package com.kiran.hop_on.service;

import com.kiran.hop_on.enumType.RideStatus;
import com.kiran.hop_on.model.User;
import com.kiran.hop_on.repository.UserRepository;
import com.kiran.hop_on.service.kafka_producer.KafkaProducerService;
import com.kiran.hop_on.model.Driver;
import com.kiran.hop_on.model.Ride;
import com.kiran.hop_on.model.Rider;
import com.kiran.hop_on.repository.DriverRepository;
import com.kiran.hop_on.repository.RideRepository;
import com.kiran.hop_on.repository.RiderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.GeoResult;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RideService {

    private final RideRepository rideRepository;
    private final RiderRepository riderRepository;
    private final DriverRepository driverRepository;
    private final KafkaProducerService kafkaProducerService;
    private final DriverLocationService driverLocationService;
    private final RideMatchingService rideMatchingService;

    public Ride requestRide(long userId, String pickupLocation, String dropLocation) {
        Rider rider = riderRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Rider Not Found :("));

        Ride ride = new Ride();
        ride.setRider(rider);
        ride.setPickupLocation(pickupLocation);
        ride.setDropLocation(dropLocation);
        ride.setStatus(RideStatus.REQUESTED);
        ride.setRequestedAt(LocalDateTime.now());

        Ride savedRide = rideRepository.save(ride);
        kafkaProducerService.publishRideRequested(savedRide);

        double[] coords = parseCoordinates(pickupLocation);
        double longitude = coords[1];
        double latitude = coords[0];

        log.info("Driver coords are : long=> "+longitude+" lat=> "+latitude);

        List<GeoResult<RedisGeoCommands.GeoLocation<String>>> nearbyDrivers =
                driverLocationService.getNearbyDrivers(longitude, latitude, 5.0);

        if (nearbyDrivers.isEmpty()) {
            throw new RuntimeException("No nearby drivers found");
        }

        for (GeoResult<RedisGeoCommands.GeoLocation<String>> driver : nearbyDrivers) {
            kafkaProducerService.notifyDriverOfRideRequest(driver.getContent().getName(), savedRide);
        }

        return savedRide;

    }

    public Ride acceptRide(long rideId, long userId) {
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        Driver driver = driverRepository.findById(userId)
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

    private double[] parseCoordinates(String loc) {
        String[] split = loc.split(",");
        return new double[]{Double.parseDouble(split[0]), Double.parseDouble(split[1])};
    }

    public Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 1. This works if 'sub' is correctly set in JWT
        String userIdStr = authentication.getName(); // Should return "52", not "User(...)"
        log.info(" ==================> get Name is ===== "+userIdStr);
        // If you're accidentally getting the full User object as principal:
        // check type and extract manually
        if (authentication.getPrincipal() instanceof User user) {
            return user.getId(); // ✅ safest if security config returns full user
        }

        return Long.parseLong(userIdStr); // ✅ fallback
    }
}
