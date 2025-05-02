package com.silkroad.silkroad.domain.product;

import com.silkroad.silkroad.domain.category.Category;
import com.silkroad.silkroad.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // PK

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // 판매자 (User와 다대일 관계)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false)
    private String title; // 상품 제목

    @Column(nullable = false, length = 1000)
    private String description; // 상품 설명

    @Column(nullable = false)
    private int price; // 가격

    @Column(nullable = false)
    private boolean isSold; // 판매 완료 여부 (true면 파냄 완료)

    @Column(nullable = false)
    private int bookmarkCount = 0; // 찜 수
}
