package com.kiran.hop_on.service.kafka_consumer;

import com.kiran.hop_on.model.Ride;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class RideRequestConsumer {

    @KafkaListener(topics = "ride-requests", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeRideRequest(Ride message) {
        log.info("Ride request received ===> " + message);
    }

}
