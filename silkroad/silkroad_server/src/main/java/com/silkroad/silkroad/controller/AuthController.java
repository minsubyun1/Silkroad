package com.silkroad.silkroad.controller;

import com.silkroad.silkroad.common.dto.ApiResponse;
import com.silkroad.silkroad.config.auth.CustomUserDetails;
import com.silkroad.silkroad.config.jwt.JwtUtil;
import com.silkroad.silkroad.dto.auth.AuthRequest;
import com.silkroad.silkroad.dto.auth.AuthResponse;
import com.silkroad.silkroad.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody AuthRequest request){
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(new ApiResponse<>(true, "로그인 성공", response));
    }
}
