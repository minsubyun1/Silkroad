package com.silkroad.silkroad.controller;

import com.silkroad.silkroad.dto.product.ProductRegisterRequest;
import com.silkroad.silkroad.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
