package com.kiran.hop_on.kafka;

import com.kiran.hop_on.model.Ride;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaProducerService {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishRideRequested(Ride ride){
        log.info("Attempting to publish ride request: {}", ride);
        try {
            kafkaTemplate.send("ride-requests", ride)
                    .whenComplete((result, failure) -> {
                        if (failure != null) {
                            log.error("Failed to publish ride request: {}", failure.getMessage());
                        } else {
                            log.info("Successfully published ride request: {}", ride);
                        }
                    });
        } catch (Exception e) {
            log.error("Exception while publishing: {}", e.getMessage(), e);
        }
    }

    public void publishRideAccepted(Ride ride) {
        kafkaTemplate.send("ride-accepted", ride);
    }

    public void notifyDriverOfRideRequest(String driverId, Ride ride) {
        log.info("Notify driver " + driverId + " of ride request " + ride.getId());
        kafkaTemplate.send("driver-notifications", driverId, ride);
    }

}
