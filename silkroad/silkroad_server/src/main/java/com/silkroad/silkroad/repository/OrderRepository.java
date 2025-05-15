package com.silkroad.silkroad.repository;

import com.silkroad.silkroad.domain.Order.Order;
import com.silkroad.silkroad.domain.product.Product;
import com.silkroad.silkroad.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // 구매자가 구매한 거래 목록 조회
    List<Order> findByBuyer(User buyer);
    // 내 거래 내역 보기 같은 마이페이지 기능에서 사용할 예정

    Optional<Order> findByBuyerAndProduct(User buyer, Product product);
}
