package com.kiran.hop_on.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class WebSocketPublisher {

    private final SimpMessagingTemplate messagingTemplate;

    public void notifyDriver(String driverId, Object payload){
        String topic = "/topic/driver/" + driverId;
        messagingTemplate.convertAndSend(topic, payload);
    }

    public void notifyRider(String riderId, Object payload) {
        String topic = "/topic/rider" + riderId;
        messagingTemplate.convertAndSend(topic, payload);
    }

}
