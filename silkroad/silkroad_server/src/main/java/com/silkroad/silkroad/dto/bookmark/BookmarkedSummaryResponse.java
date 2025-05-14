package com.silkroad.silkroad.dto.bookmark;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class BookmarkedSummaryResponse {
    private Long productId;
    private String title;
    private int price;
    private String imageUrl;
    private boolean isSold;
    private LocalDateTime bookmarkedAt;
}
