package com.silkroad.silkroad.dto.product;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class SaleHistoryResponse {
    private Long productId;
    private String title;
    private int price;
    private String imageUrl;
    private int bookmarkCount;
    private boolean isSold;
    private LocalDateTime createdAt;
}
