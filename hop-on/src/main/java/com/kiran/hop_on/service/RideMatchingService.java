package com.kiran.hop_on.service;

import com.kiran.hop_on.service.kafka_producer.KafkaProducerService;
import com.kiran.hop_on.model.Ride;
import lombok.RequiredArgsConstructor;
import org.springframework.data.geo.GeoResult;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RideMatchingService {

    private final DriverLocationService driverLocationService;
    private final KafkaProducerService kafkaProducerService;

    public void matchRiderWithDriver(Ride ride) {
        List<GeoResult<RedisGeoCommands.GeoLocation<String>>> nearbyDrivers = driverLocationService.getNearbyDrivers(
                parseLongitude(ride.getPickupLocation()),
                parseLatitude(ride.getPickupLocation()),
                5.0
        );

        nearbyDrivers.forEach(driver -> {
            kafkaProducerService.notifyDriverOfRideRequest(driver.getContent().getName(), ride);
        });

    }

    private double parseLongitude(String location) {
        return Double.parseDouble(location.split(",")[0]);
    }

    private double parseLatitude(String location) {
        return Double.parseDouble(location.split(",")[1]);
    }


}
