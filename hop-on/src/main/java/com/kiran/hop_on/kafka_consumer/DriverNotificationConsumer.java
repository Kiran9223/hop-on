package com.kiran.hop_on.kafka_consumer;

import com.kiran.hop_on.model.Ride;
import com.kiran.hop_on.websocket.WebSocketPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class DriverNotificationConsumer {

    private final WebSocketPublisher webSocketPublisher;

    @KafkaListener(topics = "driver-notifications", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeDriverNotification(Ride message){
        log.info("Notified the Driver ===> {}", message);

        try {
            String driverId = message.getDriver().getId().toString();

            webSocketPublisher.notifyDriver(driverId, message);

        }catch (Exception e){
            log.error("Error is Driver Notification Consumer{}", e.getMessage());
        }
    }

}
