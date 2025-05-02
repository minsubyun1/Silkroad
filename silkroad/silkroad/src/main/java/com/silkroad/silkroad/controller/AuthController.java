package com.silkroad.silkroad.controller;

import com.silkroad.silkroad.config.auth.CustomUserDetails;
import com.silkroad.silkroad.config.jwt.JwtUtil;
import com.silkroad.silkroad.dto.auth.AuthRequest;
import com.silkroad.silkroad.dto.auth.AuthResponse;
import lombok.RequiredArgsConstructor;
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

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request){
        System.out.println("요청 도착: " + request.getUsername());
        try {
            // 1. 아이디 / 비밀번호 검증
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            // 2. 인증된 사용자 정보 가져오기
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

            // 3. JWT 생성
            String token = jwtUtil.generateToken(userDetails.getUsername());

            // 4. 응답
            return new AuthResponse(token, null, userDetails.getUsername());
        } catch (AuthenticationException e){
            throw new RuntimeException("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
    }
}
