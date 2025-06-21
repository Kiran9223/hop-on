package com.kiran.hop_on.controller;

import com.kiran.hop_on.dto.LoginRequestDto;
import com.kiran.hop_on.dto.LoginResponseDto;
import com.kiran.hop_on.dto.RegisterRequestDto;
import com.kiran.hop_on.service.auth.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequestDto request) {
        authService.register(request);
        return ResponseEntity.ok("User registered successfully: "+request.getName()+" with phone: "+request.getPhone());
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto request)  {
        return ResponseEntity.ok(authService.login(request));
    }

}
