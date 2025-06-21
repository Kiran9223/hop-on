package com.kiran.hop_on.service.kafka_consumer;

import com.kiran.hop_on.model.Ride;
import com.kiran.hop_on.service.DriverLocationService;
import com.kiran.hop_on.websocket.WebSocketPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.GeoResult;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class DriverNotificationConsumer {

    private final WebSocketPublisher webSocketPublisher;
    private final DriverLocationService driverLocationService;

    @KafkaListener(topics = "driver-notifications", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeDriverNotification(Ride message){
        log.info("Notified the Driver ===> {}", message);

        try {

            double[] coords = parseCoordinates(message.getPickupLocation());
            double longitude = coords[1];
            double latitude = coords[0];

            List<GeoResult<RedisGeoCommands.GeoLocation<String>>> nearbyDrivers =
                    driverLocationService.getNearbyDrivers(longitude, latitude, 5.0);

            if (nearbyDrivers.isEmpty()) {
                throw new RuntimeException("No nearby drivers found");
            }

            for (GeoResult<RedisGeoCommands.GeoLocation<String>> driver : nearbyDrivers) {
                webSocketPublisher.notifyDriver(driver.getContent().getName(), message);
                log.info("Notified the driver {}", driver.getContent().getName());
            }



        }catch (Exception e){
            log.error("Error in DriverNotificationConsumer: ", e);
        }
    }

    private double[] parseCoordinates(String loc) {
        String[] split = loc.split(",");
        return new double[]{Double.parseDouble(split[0]), Double.parseDouble(split[1])};
    }

}
