package com.silkroad.silkroad.domain.ai;

import com.silkroad.silkroad.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class AIRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // 요청한 사용자

    @Column(nullable = false, length = 255)
    private String keyword; // 사용자가 요청한 키워드 (ex: '성북구 4인 숙소')

    @Column(nullable = false, length = 100)
    private String location; // 요청한 지역 (ex: '성북구')

    private LocalDateTime requestedAt = LocalDateTime.now(); // 요청 시각


}
