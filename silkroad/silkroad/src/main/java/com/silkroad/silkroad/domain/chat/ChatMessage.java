package com.silkroad.silkroad.domain.chat;

import com.silkroad.silkroad.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_id", nullable = false)
    private ChatRoom chatRoom; // 어떤 채팅방에 속하는 메세지인가

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender; // 메세지를 보낸 사람

    @Column(nullable = false, length = 1000)
    private String message; // 메세지 내용

    private LocalDateTime sentAt = LocalDateTime.now(); // 메세지 보낸 시각
}
