package com.silkroad.silkroad.service;


import com.silkroad.silkroad.domain.product.Product;
import com.silkroad.silkroad.domain.product.ProductCategory;
import com.silkroad.silkroad.domain.user.User;
import com.silkroad.silkroad.dto.product.ProductRegisterRequest;
import com.silkroad.silkroad.repository.ProductRepository;
import com.silkroad.silkroad.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
