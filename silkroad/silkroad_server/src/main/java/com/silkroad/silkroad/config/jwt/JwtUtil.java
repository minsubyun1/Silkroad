package com.silkroad.silkroad.config.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
public class JwtUtil {
    private final String secret = "silkroadjwtsecretkeysilkroadjwtsecretkey"; // 최소 32 바이트 이상
    private final long expiration = 1000 * 60 * 60; // 1시간

    private final Key key = Keys.hmacShaKeyFor(secret.getBytes());

    // 토큰 생성
    public String generateToken(String username){
        return Jwts.builder()
                .setSubject("SilkRoadToken")
                .claim("username", username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // 토큰에서 username 추출
    public String extractUsername (String token){
        return getClaims(token).get("username", String.class);
    }

    // 토큰 만료시간 추출
    public Date extractExpiration(String token) {
        return getClaims(token).getExpiration();
    }

    // 토큰 유효성 검증
    public boolean validateToken(String token) {
        try {
            getClaims(token); // parsing 성공하면 유효한 토큰
            return true;
        } catch (JwtException | IllegalArgumentException e){
            return false;
        }
    }

    //Claims 추출 (디코딩된 토큰 내용)
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
