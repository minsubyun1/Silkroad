package com.silkroad.silkroad.service;

import com.silkroad.silkroad.domain.product.Product;
import com.silkroad.silkroad.domain.user.User;
import com.silkroad.silkroad.dto.product.SaleHistoryResponse;
import com.silkroad.silkroad.repository.ProductRepository;
import com.silkroad.silkroad.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SaleHistoryService {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<SaleHistoryResponse> getSaleHistory(String username) {
        User seller = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("판매자 정보를 찾을 수 없습니다."));

        List<Product> products = productRepository.findByUser(seller);

        return products.stream()
                .map(p -> new SaleHistoryResponse(
                        p.getId(),
                        p.getTitle(),
                        p.getPrice(),
                        p.getImages().isEmpty() ? null : p.getImages().get(0).getImageUrl(),
                        p.getBookmarkCount(),
                        p.isSold(),
                        p.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }
}
