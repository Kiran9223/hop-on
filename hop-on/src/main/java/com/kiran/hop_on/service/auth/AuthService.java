package com.kiran.hop_on.service.auth;

import com.kiran.hop_on.dto.LoginRequestDto;
import com.kiran.hop_on.dto.LoginResponseDto;
import com.kiran.hop_on.dto.RegisterRequestDto;
import com.kiran.hop_on.enumType.Role;
import com.kiran.hop_on.model.Driver;
import com.kiran.hop_on.model.Rider;
import com.kiran.hop_on.model.User;
import com.kiran.hop_on.repository.DriverRepository;
import com.kiran.hop_on.repository.RiderRepository;
import com.kiran.hop_on.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RiderRepository riderRepository;
    private final DriverRepository driverRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
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

        user = userRepository.save(user);

        if(request.getRole() == Role.RIDER){
            Rider rider = new Rider();
            rider.setUser(user);
            riderRepository.save(rider);
        }else if (request.getRole() == Role.DRIVER){
            Driver driver = new Driver();
            driver.setUser(user);
            driver.setAvailable(true);
            driver.setVehicle(request.getVehicle());
            driverRepository.save(driver);
        }

    }


    public LoginResponseDto login(LoginRequestDto request) {
        User user = userRepository.findByPhone(request.getPhone())
                .orElseThrow(() -> new RuntimeException("User not found with the given phone number"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String jwt = jwtService.generateToken(user);

        return new LoginResponseDto(jwt, user.getId(), user.getRole().name());

    }

}
