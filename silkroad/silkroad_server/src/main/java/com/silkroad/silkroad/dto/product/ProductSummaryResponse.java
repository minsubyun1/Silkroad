package com.silkroad.silkroad.dto.product;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ProductSummaryResponse {
    private Long id;
    private String title;
    private int price;
    private String imageUrl;
    private String location; // 판매자 위치
    private LocalDateTime createdAt;
}
