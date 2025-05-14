package com.silkroad.silkroad.service;


import com.silkroad.silkroad.domain.product.Product;
import com.silkroad.silkroad.domain.product.ProductCategory;
import com.silkroad.silkroad.domain.user.User;
import com.silkroad.silkroad.dto.product.ProductDetailResponse;
import com.silkroad.silkroad.dto.product.ProductRegisterRequest;
import com.silkroad.silkroad.dto.product.ProductSummaryResponse;
import com.silkroad.silkroad.dto.product.ProductUpdateRequest;
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
                        p.getCategory().getDisplayName(),
                        p.getBookmarkCount(),
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
                seller.getUsername(),
                seller.getName(),
                seller.getLocation(),
                seller.getProfileImageUrl(),
                product.getBookmarkCount(),
                product.getCreatedAt()
        );
    }

    @Transactional
    public void updateProduct(Long productId, String username, ProductUpdateRequest request){
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));

        // 권한 확인
        if (!product.getUser().getUsername().equals(username)) {
            throw new IllegalArgumentException("수정 권한이 없습니다.");
        }

        product.update(request.getTitle(), request.getDescription(), request.getPrice(), request.getImageUrl());
    }

    @Transactional
    public void deleteProduct(Long productId, String username){
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));

        if (!product.getUser().getUsername().equals(username)) {
            throw new IllegalArgumentException("삭제 권한이 없습니다.");
        }

        productRepository.delete(product);
    }

    @Transactional(readOnly = true)
    public List<ProductSummaryResponse> searchProducts(String keyword, ProductCategory category){
        List<Product> products;

        if (keyword != null && category != null) {
            products = productRepository.findByTitleContainingIgnoreCaseAndCategory(keyword, category);
        } else if(keyword != null) {
            products = productRepository.findByTitleContainingIgnoreCase(keyword);
        } else if(category != null) {
            products = productRepository.findByCategory(category);
        } else {
            products = productRepository.findAll();
        }

        return products.stream()
                .map(p -> new ProductSummaryResponse(
                        p.getId(),
                        p.getTitle(),
                        p.getPrice(),
                        p.getImageUrl(),
                        p.getCategory().getDisplayName(),
                        p.getBookmarkCount(),
                        p.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public void markProductAsSold(Long productId, String username) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));

        if (!product.getUser().getUsername().equals(username)) {
            throw new IllegalArgumentException("해당 상품을 수정할 권한이 없습니다.");
        }

        product.setSold(true);
    }
}
