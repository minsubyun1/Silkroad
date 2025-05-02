package com.silkroad.silkroad.domain.Order;

import com.silkroad.silkroad.domain.product.Product;
import com.silkroad.silkroad.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "orders") // order는 예약어라서 테이블명 따로 설정
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product; // 거래된 상품

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id", nullable = false)
    private User buyer; // 구매자

    @Enumerated(EnumType.STRING)
    private OrderStatus status; // 거래 상태(COMPLETED, CANCELLED)

    private LocalDateTime orderTime; // 거래 시각

    // 생성자
    public Order(Product product, User buyer){
        this.product = product;
        this.buyer = buyer;
        this.status = OrderStatus.COMPLETED; // 기본은 거래 완료
        this.orderTime = LocalDateTime.now();
    }

    // 거래 취소 메서드
    public void cancel() {
        this.status = OrderStatus.CANCELLED;
    }
}
