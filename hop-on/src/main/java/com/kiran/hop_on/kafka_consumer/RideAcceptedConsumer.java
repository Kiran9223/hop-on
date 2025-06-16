package com.kiran.hop_on.kafka_consumer;

import com.kiran.hop_on.model.Ride;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class RideAcceptedConsumer {

    @KafkaListener(topics = "ride-accepted", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeRideAccepted(Ride message){
        log.info("Ride Accepted Consumer ===> "+message);

    }


}
