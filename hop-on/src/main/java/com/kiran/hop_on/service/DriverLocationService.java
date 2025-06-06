package com.kiran.hop_on.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.geo.*;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.domain.geo.GeoLocation;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DriverLocationService {

    private final Logger LOGGER = LoggerFactory.getLogger(DriverLocationService.class);

    private final RedisTemplate<String, String> redisTemplate;

    private static final String DRIVERS_LOCATION_KEY = "drivers_location";

    public void updateDriverLocation(String driverId, double longitude, double latitude) {
        redisTemplate.opsForGeo().add(DRIVERS_LOCATION_KEY, new Point(longitude, latitude), driverId);
    }

    public List<GeoResult<RedisGeoCommands.GeoLocation<String>>> getNearbyDrivers(double longitude, double latitude, double radiusKm) {
        try{
            Circle searchArea = new Circle(new Point(longitude, latitude), new Distance(radiusKm, RedisGeoCommands.DistanceUnit.KILOMETERS));

            GeoResults<RedisGeoCommands.GeoLocation<String>> results = redisTemplate.opsForGeo()
                    .radius(DRIVERS_LOCATION_KEY, searchArea, RedisGeoCommands.GeoRadiusCommandArgs.newGeoRadiusArgs().includeDistance().includeCoordinates());

            assert results != null;
            return results.getContent();
        } catch (Exception e){
            LOGGER.error(e.getMessage());
        }
        return new ArrayList<>();
    }

}
