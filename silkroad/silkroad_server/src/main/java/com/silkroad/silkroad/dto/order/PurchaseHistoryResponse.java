package com.silkroad.silkroad.dto.order;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class PurchaseHistoryResponse {
    private Long productId;
    private String title;
    private int price;
    private String imageUrl;
    private LocalDateTime orderTime;
}
