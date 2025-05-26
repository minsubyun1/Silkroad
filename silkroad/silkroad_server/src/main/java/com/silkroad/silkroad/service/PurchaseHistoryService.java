package com.silkroad.silkroad.service;

import com.silkroad.silkroad.domain.Order.Order;
import com.silkroad.silkroad.domain.user.User;
import com.silkroad.silkroad.dto.order.PurchaseHistoryResponse;
import com.silkroad.silkroad.repository.OrderRepository;
import com.silkroad.silkroad.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PurchaseHistoryService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<PurchaseHistoryResponse> getPurchaseHistory(String username) {
        User buyer = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("유저가 존재하지 않습니다."));

        List<Order> orders = orderRepository.findByBuyer(buyer);

        return orders.stream()
                .map(order -> new PurchaseHistoryResponse(
                        order.getProduct().getId(),
                        order.getProduct().getTitle(),
                        order.getProduct().getPrice(),
                        order.getProduct().getImageUrl(),
                        order.getOrderTime()
                ))
                .collect(Collectors.toList());
    }
}
