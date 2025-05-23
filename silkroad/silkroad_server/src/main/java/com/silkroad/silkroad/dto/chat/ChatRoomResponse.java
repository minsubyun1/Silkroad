package com.silkroad.silkroad.dto.chat;


import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ChatRoomResponse {
    private Long roomId;
    private String opponentImageUrl;
    private String opponentName;
    private String lastMessage;
    private LocalDateTime lastMessageTime;
}
