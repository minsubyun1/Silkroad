package com.silkroad.silkroad.repository;

import com.silkroad.silkroad.domain.chat.ChatMessage;
import com.silkroad.silkroad.domain.chat.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    // 채팅방 내 메세지 시간순 조회
    List<ChatMessage> findByChatRoomOrderBySentAtAsc(ChatRoom chatRoom);
}
