package com.silkroad.silkroad.domain.bookmark;

import com.silkroad.silkroad.domain.product.Product;
import com.silkroad.silkroad.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // 찜한 사람

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product; // 찜한 상품

    @Column(nullable = false)
    private boolean active = true; // 찜 활성 여부 (추후 확장 가능)
}
