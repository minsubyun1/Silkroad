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
    private String categoryDisplayName;
    private int bookmarkCount;
    private LocalDateTime createdAt;
}
