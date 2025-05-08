package com.silkroad.silkroad.service;


import com.silkroad.silkroad.domain.product.Product;
import com.silkroad.silkroad.domain.product.ProductCategory;
import com.silkroad.silkroad.domain.user.User;
import com.silkroad.silkroad.dto.product.ProductDetailResponse;
import com.silkroad.silkroad.dto.product.ProductRegisterRequest;
import com.silkroad.silkroad.dto.product.ProductSummaryResponse;
import com.silkroad.silkroad.repository.ProductRepository;
import com.silkroad.silkroad.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Transactional
    public void registerProduct(String username, ProductRegisterRequest request){
        User seller = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("판매자 정보를 찾을 수 없습니다."));

        ProductCategory category = request.getCategory();

        Product product = Product.builder()
                        .user(seller)
                        .category(category)
                        .title(request.getTitle())
                        .description(request.getDescription())
                        .price(request.getPrice())
                        .imageUrl(request.getImageUrl())
                        .isSold(false)
                        .bookmarkCount(0)
                        .build();

        productRepository.save(product);
    }

    @Transactional(readOnly = true)
    public List<ProductSummaryResponse> getAllproducts() {
        List<Product> products = productRepository.findAll();

        return products.stream()
                .map(p -> new ProductSummaryResponse(
                        p.getId(),
                        p.getTitle(),
                        p.getPrice(),
                        p.getImageUrl(),
                        p.getUser().getLocation(),
                        p.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProductDetailResponse getProductDetail(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품이 존재하지 않습니다."));

        User seller = product.getUser();

        return new ProductDetailResponse(
                product.getId(),
                product.getTitle(),
                product.getPrice(),
                product.getDescription(),
                product.getImageUrl(),
                seller.getName(),
                seller.getLocation(),
                seller.getProfileImageUrl(),
                product.getBookmarkCount(),
                product.getCreatedAt()
        );
    }
}
