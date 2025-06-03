package com.kiran.hop_on.controller;

import com.kiran.hop_on.dto.RideAcceptDto;
import com.kiran.hop_on.dto.RideRequestDto;
import com.kiran.hop_on.enumType.RideStatus;
import com.kiran.hop_on.model.Ride;
import com.kiran.hop_on.service.RideService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rides")
@RequiredArgsConstructor
public class RideController {
    private final RideService rideService;

    @PostMapping("/request")
    public ResponseEntity<Ride> requestRide(@RequestBody RideRequestDto dto) {
        Ride ride = rideService.requestRide(dto.getRiderId(), dto.getPickupLocation(), dto.getDropLocation());
        return ResponseEntity.ok(ride);
    }

    @PostMapping("/{rideId}/accept")
    public ResponseEntity<Ride> acceptRide(@PathVariable long rideId, @RequestBody RideAcceptDto dto) {
        Ride ride = rideService.acceptRide(rideId, dto.getDriverId());
        return ResponseEntity.ok(ride);
    }

    @GetMapping("/{rideId}/status")
    public ResponseEntity<RideStatus> getRideStatus(@PathVariable long rideId) {
        Ride ride = rideService.getRideById(rideId);
        return ResponseEntity.ok(ride.getStatus());
    }

}
