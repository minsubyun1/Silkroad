package com.silkroad.silkroad.controller;

import com.silkroad.silkroad.common.dto.ApiResponse;
import com.silkroad.silkroad.domain.product.ProductCategory;
import com.silkroad.silkroad.dto.product.ProductDetailResponse;
import com.silkroad.silkroad.dto.product.ProductRegisterRequest;
import com.silkroad.silkroad.dto.product.ProductSummaryResponse;
import com.silkroad.silkroad.dto.product.ProductUpdateRequest;
import com.silkroad.silkroad.service.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@Tag(name = "상품 API", description = "상품 등록, 조회, 수정, 삭제 등을 제공합니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    @Operation(summary = "상품 등록", description = "상품 정보를 입력하여 새 상품을 등록합니다.")
    @PostMapping
    public ResponseEntity<ApiResponse<String>> registerProduct(@AuthenticationPrincipal UserDetails userDetails, @ModelAttribute ProductRegisterRequest request, HttpServletRequest HttpRequest){
        productService.registerProduct(userDetails.getUsername(), request, HttpRequest);
        return ResponseEntity.ok(new ApiResponse<>(true, "상품이 성공적으로 등록되었습니다.", null));
    }

    @Operation(summary = "전체 상품 조회", description = "모든 상품 목록을 요약 정보와 함께 반환합니다.")
    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductSummaryResponse>>> getAllProducts() {
        List<ProductSummaryResponse> response = productService.getAllproducts();
        return ResponseEntity.ok(new ApiResponse<>(true, "전체 상품 목록 조회 성공", response));
    }

    @Operation(summary = "상품 상세 조회", description = "상품 ID로 해당 상품의 상세 정보를 조회합니다.")
    @GetMapping("/{productId}")
    public ResponseEntity<ApiResponse<ProductDetailResponse>> getProductDetail(@PathVariable("productId") Long productId){
        ProductDetailResponse detail = productService.getProductDetail(productId);
        return ResponseEntity.ok(new ApiResponse<>(true, "상품 상세 조회 성공", detail));
    }

    @Operation(summary = "상품 수정", description = "상품 정보를 수정합니다. 작성자만 수정 가능합니다.")
    @PatchMapping("/{productId}")
    public ResponseEntity<ApiResponse<String>> updateProduct(@PathVariable("productId") Long productId, @AuthenticationPrincipal UserDetails userDetails, @RequestBody ProductUpdateRequest request){
        productService.updateProduct(productId, userDetails.getUsername(), request);
        return ResponseEntity.ok(new ApiResponse<>(true, "상품이 수정되었습니다.", null));
    }

    @Operation(summary = "상품 삭제", description = "상품을 삭제합니다. 작성자만 삭제 가능합니다.")
    @DeleteMapping("/{productId}")
    public ResponseEntity<ApiResponse<String>> deleteProduct(@PathVariable("productId") Long productId,
                                @AuthenticationPrincipal UserDetails userDetails){
        productService.deleteProduct(productId, userDetails.getUsername());
        return ResponseEntity.ok(new ApiResponse<>(true, "상품이 삭제되었습니다.", null));
    }

    @Operation(summary = "상품 검색", description = "키워드와 카테고리로 상품을 검색합니다. 파라미터는 선택입니다.")
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<ProductSummaryResponse>>> searchProducts(
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "category", required = false)ProductCategory category
            ) {
        List<ProductSummaryResponse> response = productService.searchProducts(keyword, category);
        return ResponseEntity.ok(new ApiResponse<>(true, "상품 검색 성공", response));
    }
}
