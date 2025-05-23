package com.silkroad.silkroad.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ChatMessageResponse {
    private String senderName;
    private String senderProfileImage;
    private String message;
    private LocalDateTime sentAt;
    private boolean isMe;
}