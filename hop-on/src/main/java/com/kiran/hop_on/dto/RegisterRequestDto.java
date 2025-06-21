package com.kiran.hop_on.dto;

import com.kiran.hop_on.enumType.Role;
import lombok.Data;

@Data
public class RegisterRequestDto {
    private String name;
    private String phone;
    private String password;
    private Role role;
}
