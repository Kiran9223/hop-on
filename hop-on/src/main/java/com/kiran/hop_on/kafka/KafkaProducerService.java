package com.kiran.hop_on.kafka;

import com.kiran.hop_on.model.Ride;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public KafkaProducerService(KafkaTemplate<String, Object> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publishRideRequested(Ride ride){
        kafkaTemplate.send("ride-requests", ride);
    }

    public void publishRideAccepted(Ride ride) {
        kafkaTemplate.send("ride-accepted", ride);
    }

}
