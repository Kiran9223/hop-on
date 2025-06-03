package com.kiran.hop_on.dto;

import lombok.Data;

@Data
public class RideRequestDto {
    private long riderId;
    private String pickupLocation;
    private String dropLocation;
}
