package com.silkroad.silkroad.domain.bookmark;

import com.silkroad.silkroad.domain.product.Product;
import com.silkroad.silkroad.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@EntityListeners(AuditingEntityListener.class)
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

    public Bookmark(User user, Product product) {
        this.user = user;
        this.product = product;
    }

    @Column(nullable = false)
    private boolean active = true; // 찜 활성 여부 (추후 확장 가능)

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
