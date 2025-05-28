package com.silkroad.silkroad.service;

import com.silkroad.silkroad.config.auth.CustomUserDetails;
import com.silkroad.silkroad.config.jwt.JwtUtil;
import com.silkroad.silkroad.dto.auth.AuthRequest;
import com.silkroad.silkroad.dto.auth.AuthResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthResponse login(AuthRequest request) {

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
        } catch (ArithmeticException e) {
            throw new RuntimeException("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
    }
}
