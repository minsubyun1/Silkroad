package com.silkroad.silkroad.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponse {
    private String accessToken;
    private String refreshToken; // 나중에 RefreshToken 추가할 경우
    private String username;
}
