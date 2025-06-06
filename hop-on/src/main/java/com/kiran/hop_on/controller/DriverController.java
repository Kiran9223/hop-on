package com.kiran.hop_on.controller;

import com.kiran.hop_on.dto.LocationDto;
import com.kiran.hop_on.service.DriverLocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/drivers")
@RequiredArgsConstructor
public class DriverController {

    private final DriverLocationService driverLocationService;

    @PostMapping("/{driverId}/location")
    public ResponseEntity<Void> updateDriverLocation(@PathVariable String driverId, @RequestBody LocationDto locationDto) {
        driverLocationService.updateDriverLocation(driverId, locationDto.getLongitude(), locationDto.getLatitude());
        return ResponseEntity.ok().build();
    }

}
