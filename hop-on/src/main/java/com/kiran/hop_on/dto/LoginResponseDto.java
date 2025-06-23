package com.kiran.hop_on.dto;

import com.kiran.hop_on.enumType.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDto {
    private String token;
    private Long userId;
    private String role;
}
