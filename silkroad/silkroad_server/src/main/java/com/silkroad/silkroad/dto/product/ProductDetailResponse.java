package com.silkroad.silkroad.dto.product;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class ProductDetailResponse {
    private Long id;
    private String title;
    private int price;
    private String description;
    List<String> imageUrls;

    private String sellerUsername;
    private String sellerName;
    private String sellerLocation;
    private String sellerProfileImage;
    private int bookmarkCount;
    private LocalDateTime createdAt;
}
