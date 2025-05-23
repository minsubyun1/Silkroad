package com.silkroad.silkroad.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ChatRoomDetailResponse {
    private Long roomId;
    private String opponentName;
    private String productTitle;
    private int productPrice;
    private String productImageUrl;
    private boolean isSeller;
}
