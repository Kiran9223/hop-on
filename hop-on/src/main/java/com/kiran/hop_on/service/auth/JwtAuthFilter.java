package com.kiran.hop_on.service.auth;

import com.kiran.hop_on.model.User;
import com.kiran.hop_on.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        if(!jwtService.validateToken(token)){
            filterChain.doFilter(request, response);
            return;
        }

        String userId = jwtService.extractUserId(token);
        User user = userRepository.findById(Long.parseLong(userId))
                .orElseThrow();

        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                user, null, Collections.emptyList());

        SecurityContextHolder.getContext().setAuthentication(auth);
        filterChain.doFilter(request, response);

    }
}
