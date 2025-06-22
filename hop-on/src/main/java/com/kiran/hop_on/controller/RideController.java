package com.kiran.hop_on.controller;

import com.kiran.hop_on.dto.RideAcceptDto;
import com.kiran.hop_on.dto.RideRequestDto;
import com.kiran.hop_on.enumType.RideStatus;
import com.kiran.hop_on.model.Ride;
import com.kiran.hop_on.service.RideService;
import com.kiran.hop_on.service.auth.JwtService;
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
        Long riderId = rideService.getCurrentUserId();
        Ride ride = rideService.requestRide(riderId, dto.getPickupLocation(), dto.getDropLocation());
        return ResponseEntity.ok(ride);
    }

    @PostMapping("/{rideId}/accept")
    public ResponseEntity<Ride> acceptRide(@PathVariable long rideId, @RequestBody RideAcceptDto dto) {
        Long driverId = rideService.getCurrentUserId();
        Ride ride = rideService.acceptRide(rideId, driverId);
        return ResponseEntity.ok(ride);
    }

    @GetMapping("/{rideId}/status")
    public ResponseEntity<RideStatus> getRideStatus(@PathVariable long rideId) {
        Ride ride = rideService.getRideById(rideId);
        return ResponseEntity.ok(ride.getStatus());
    }

}
