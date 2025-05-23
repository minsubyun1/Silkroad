package com.silkroad.silkroad.controller;

import com.silkroad.silkroad.dto.chat.ChatMessageRequest;
import com.silkroad.silkroad.dto.chat.ChatMessageResponse;
import com.silkroad.silkroad.dto.chat.ChatRoomDetailResponse;
import com.silkroad.silkroad.dto.chat.ChatRoomResponse;
import com.silkroad.silkroad.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chats")
public class ChatController {

    private final ChatService chatService;

    // 전체 채팅방 목록 조회
    @GetMapping("/rooms")
    public List<ChatRoomResponse> getChatRooms(@AuthenticationPrincipal UserDetails userDetails){
        return chatService.getChatRooms(userDetails.getUsername());
    }

    // 구매 채팅방 목록 조회
    @GetMapping("/rooms/buy")
    public List<ChatRoomResponse> getBuyerChatRooms(@AuthenticationPrincipal UserDetails userDetails){
        return chatService.getBuyerChatRooms(userDetails.getUsername());
    }

    // 판매 채팅방 목록
    @GetMapping("/rooms/sell")
    public List<ChatRoomResponse> getSellerChatRooms(@AuthenticationPrincipal UserDetails userDetails){
        return chatService.getSellerChatRooms(userDetails.getUsername());
    }


    // 채팅방 상세 상단 정보
    @GetMapping("/room/{roomId}")
    public ChatRoomDetailResponse getChatRoomDetail(@PathVariable("roomId") Long roomId,
                                                    @AuthenticationPrincipal UserDetails userDetails) {
        return chatService.getChatRoomDetail(roomId, userDetails.getUsername());
    }

    // 채팅 메세지 전체 조회
    @GetMapping("/room/{roomId}/messages")
    public List<ChatMessageResponse> getChatMessages(@PathVariable("roomId") Long roomId,
                                                     @AuthenticationPrincipal UserDetails userDetails){
        return chatService.getMessages(roomId, userDetails.getUsername());
    }

    // 채팅방 생성 or 기존 채팅방 조회
    @PostMapping("/room/{productId}")
    public Long createChatRoom(@PathVariable("productId") Long productId,
                                    @AuthenticationPrincipal UserDetails userDetails) {
        return chatService.createChatRoom(userDetails.getUsername(), productId);
    }

    // 메시지 전송
    @PostMapping("room/{roomId}/message")
    public void sendMessage(@PathVariable("roomId") Long roomId,
                            @RequestBody ChatMessageRequest request,
                            @AuthenticationPrincipal UserDetails userDetails){
        chatService.sendMessage(userDetails.getUsername(), roomId, request);
    }

    @PatchMapping("/room/{roomId}/complete")
    public String completeTransaction(@PathVariable("roomId") Long roomId,
                                      @AuthenticationPrincipal UserDetails userDetails) {
        chatService.completeTransaction(roomId, userDetails.getUsername());
        return "거래가 완료되었습니다.";
    }

}
