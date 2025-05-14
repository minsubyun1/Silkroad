package com.silkroad.silkroad.service;

import com.silkroad.silkroad.domain.Order.Order;
import com.silkroad.silkroad.domain.product.Product;
import com.silkroad.silkroad.domain.user.User;
import com.silkroad.silkroad.repository.OrderRepository;
import com.silkroad.silkroad.repository.ProductRepository;
import com.silkroad.silkroad.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Transactional
    public void confirmPurchase(String username, Long productId) {
        User buyer = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("구매자 정보를 찾을 수 없습니다."));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));

        // 중복 거래 방지
        orderRepository.findByBuyerAndProduct(buyer, product).ifPresent(o -> {
            throw new IllegalArgumentException("이미 구매 완료한 상품입니다.");
        });

        Order order = new Order(product, buyer);
        orderRepository.save(order);
    }

}
