package com.silkroad.silkroad.controller;

import com.silkroad.silkroad.domain.product.ProductCategory;
import com.silkroad.silkroad.dto.product.ProductDetailResponse;
import com.silkroad.silkroad.dto.product.ProductRegisterRequest;
import com.silkroad.silkroad.dto.product.ProductSummaryResponse;
import com.silkroad.silkroad.dto.product.ProductUpdateRequest;
import com.silkroad.silkroad.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public String registerProduct(@AuthenticationPrincipal UserDetails userDetails, @RequestBody ProductRegisterRequest request){
        productService.registerProduct(userDetails.getUsername(), request);
        return "상품이 성공적으로 등록되었습니다.";
    }

    @GetMapping
    public List<ProductSummaryResponse> getAllProducts() {
        return productService.getAllproducts();
    }

    @GetMapping("/{productId}")
    public ProductDetailResponse getProductDetail(@PathVariable("productId") Long productId){
        return productService.getProductDetail(productId);
    }

    @PatchMapping("/{productId}")
    public String updateProduct(@PathVariable("productId") Long productId, @AuthenticationPrincipal UserDetails userDetails, @RequestBody ProductUpdateRequest request){
        productService.updateProduct(productId, userDetails.getUsername(), request);
        return "상품이 수정되었습니다.";
    }

    @DeleteMapping("/{productId}")
    public String deleteProduct(@PathVariable("productId") Long productId,
                                @AuthenticationPrincipal UserDetails userDetails){
        productService.deleteProduct(productId, userDetails.getUsername());
        return "상품이 삭제되었습니다.";
    }

    @GetMapping("/search")
    public List<ProductSummaryResponse> searchProducts(
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "category", required = false)ProductCategory category
            ) {
        return productService.searchProducts(keyword, category);
    }
}
