package com.kiran.hop_on.kafka_consumer;

import com.kiran.hop_on.model.Ride;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class DriverNotificationConsumer {

    @KafkaListener(topics = "driver-notifications", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeDriverNotification(Ride message){
        log.info("Notified the Driver ===> "+message);
    }

}
