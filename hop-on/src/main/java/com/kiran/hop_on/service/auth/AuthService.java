package com.kiran.hop_on.service.auth;

import com.kiran.hop_on.dto.LoginRequestDto;
import com.kiran.hop_on.dto.LoginResponseDto;
import com.kiran.hop_on.dto.RegisterRequestDto;
import com.kiran.hop_on.model.User;
import com.kiran.hop_on.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public void register(RegisterRequestDto request) {

        if(userRepository.findByPhone(request.getPhone()).isPresent()) {
            throw new RuntimeException("User is already registered with the same phone number");
        }

        User user = User.builder()
                .name(request.getName())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        userRepository.save(user);

    }


    public LoginResponseDto login(LoginRequestDto request) {
        User user = userRepository.findByPhone(request.getPhone())
                .orElseThrow(() -> new RuntimeException("User not found with the given phone number"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String jwt = jwtService.generateToken(user);

        return new LoginResponseDto(jwt);

    }

}
