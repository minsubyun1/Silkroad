package com.silkroad.silkroad.domain.category;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // PK

    @Column(nullable = false, unique = true)
    private String name; // 카테고리 이름 (예: 전자기기, 가구)

    // (추후 필요 시) Product와의 양방향 연관관계 추가
}
