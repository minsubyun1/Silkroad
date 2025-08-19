package com.silkroad.silkroad.domain.product;

import com.silkroad.silkroad.domain.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // PK

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // 판매자 (User와 다대일 관계)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductCategory category;

    @Column(nullable = false)
    private String title; // 상품 제목

    @Column(nullable = false, length = 1000)
    private String description; // 상품 설명

    @Column(nullable = false)
    private int price; // 가격

    @Setter
    @Column(nullable = false)
    private boolean isSold; // 판매 완료 여부

    @Setter
    @Column(nullable = false)
    @Builder.Default
    private int bookmarkCount = 0; // 찜 수

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ProductImage> images = new ArrayList<>();

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;


    public void update(String title, String description, int price, List<String> imageUrls) {
        this.title = title;
        this.description = description;
        this.price = price;

        // 기존 이미지 초기화 (orphanRemoval=true 덕분에 자동 삭제됨)
        this.images.clear();

        List<ProductImage> updatedImages = imageUrls.stream()
                .map(url -> new ProductImage(url, this))
                .collect(Collectors.toList());

        this.images.addAll(updatedImages);
    }
}
