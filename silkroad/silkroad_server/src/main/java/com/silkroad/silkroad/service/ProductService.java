package com.silkroad.silkroad.service;


import com.silkroad.silkroad.domain.Order.Order;
import com.silkroad.silkroad.domain.product.Product;
import com.silkroad.silkroad.domain.product.ProductCategory;
import com.silkroad.silkroad.domain.product.ProductImage;
import com.silkroad.silkroad.domain.user.User;
import com.silkroad.silkroad.dto.product.ProductDetailResponse;
import com.silkroad.silkroad.dto.product.ProductRegisterRequest;
import com.silkroad.silkroad.dto.product.ProductSummaryResponse;
import com.silkroad.silkroad.dto.product.ProductUpdateRequest;
import com.silkroad.silkroad.repository.OrderRepository;
import com.silkroad.silkroad.repository.ProductRepository;
import com.silkroad.silkroad.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
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
    private final OrderRepository orderRepository;
    private final FileUploadService fileUploadService;

    @Transactional
    public void registerProduct(String username, ProductRegisterRequest request, HttpServletRequest httpRequest){
        User seller = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("판매자 정보를 찾을 수 없습니다."));

        ProductCategory category = request.getCategory();

        Product product = Product.builder()
                        .user(seller)
                        .category(category)
                        .title(request.getTitle())
                        .description(request.getDescription())
                        .price(request.getPrice())
                        .isSold(false)
                        .bookmarkCount(0)
                        .build();

        // 이미지 업로드 및 매핑
        List<String> imageUrls = fileUploadService.upload(request.getImageFiles(), "products", httpRequest);
        List<ProductImage> productImages = imageUrls.stream()
                .map(url -> new ProductImage(url, product))
                .collect(Collectors.toList());

        product.setImages(productImages);

        productRepository.save(product); // cascade 덕분에 이미지도 함께 저장됨

    }

    @Transactional(readOnly = true)
    public List<ProductSummaryResponse> getAllproducts() {
        List<Product> products = productRepository.findAll();

        return products.stream()
                .map(p -> new ProductSummaryResponse(
                        p.getId(),
                        p.getTitle(),
                        p.getPrice(),
                        p.getImages().isEmpty() ? null : p.getImages().get(0).getImageUrl(),
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

        // 전체 이미지 리스트 추출
        List<String> imageUrls = product.getImages().stream()
                .map(ProductImage::getImageUrl)
                .collect(Collectors.toList());

        return new ProductDetailResponse(
                product.getId(),
                product.getTitle(),
                product.getPrice(),
                product.getDescription(),
                imageUrls,
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

        if (!product.getUser().getUsername().equals(username)) {
            throw new IllegalArgumentException("수정 권한이 없습니다.");
        }

        // 새로운 이미지 URL들로 교체
        List<String> imageUrls = request.getImageUrls(); // DTO 수정 필요
        product.update(request.getTitle(), request.getDescription(), request.getPrice(), imageUrls);
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
                        p.getImages().isEmpty() ? null : p.getImages().get(0).getImageUrl(),
                        p.getCategory().getDisplayName(),
                        p.getBookmarkCount(),
                        p.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }



}
