package com.silkroad.silkroad.controller;

import com.silkroad.silkroad.common.dto.ApiResponse;
import com.silkroad.silkroad.dto.chat.ChatMessageRequest;
import com.silkroad.silkroad.dto.chat.ChatMessageResponse;
import com.silkroad.silkroad.dto.chat.ChatRoomDetailResponse;
import com.silkroad.silkroad.dto.chat.ChatRoomResponse;
import com.silkroad.silkroad.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<ApiResponse<List<ChatRoomResponse>>> getChatRooms(@AuthenticationPrincipal UserDetails userDetails){
        List<ChatRoomResponse> chatrooms = chatService.getChatRooms(userDetails.getUsername());
        return ResponseEntity.ok(new ApiResponse<>(true, "전체 채팅방 목록 조회 성공", chatrooms));
    }

    // 구매 채팅방 목록 조회
    @GetMapping("/rooms/buy")
    public ResponseEntity<ApiResponse<List<ChatRoomResponse>>> getBuyerChatRooms(@AuthenticationPrincipal UserDetails userDetails){
        List<ChatRoomResponse> buyer_chatRooms = chatService.getBuyerChatRooms(userDetails.getUsername());
        return ResponseEntity.ok(new ApiResponse<>(true, "구매 채팅 목록 조회 성공", buyer_chatRooms));
    }

    // 판매 채팅방 목록
    @GetMapping("/rooms/sell")
    public ResponseEntity<ApiResponse<List<ChatRoomResponse>>> getSellerChatRooms(@AuthenticationPrincipal UserDetails userDetails){
        List<ChatRoomResponse> seller_chatRooms = chatService.getSellerChatRooms(userDetails.getUsername());
        return ResponseEntity.ok(new ApiResponse<>(true, "판매 채팅 목록 조회 성공", seller_chatRooms));
    }


    // 채팅방 상세 상단 정보
    @GetMapping("/room/{roomId}")
    public ResponseEntity<ApiResponse<ChatRoomDetailResponse>> getChatRoomDetail(@PathVariable("roomId") Long roomId,
                                                    @AuthenticationPrincipal UserDetails userDetails) {
        ChatRoomDetailResponse response = chatService.getChatRoomDetail(roomId, userDetails.getUsername());
        return ResponseEntity.ok(new ApiResponse<>(true, "채팅방 상세 상단 조회 성공", response));
    }

    // 채팅 메세지 전체 조회
    @GetMapping("/room/{roomId}/messages")
    public ResponseEntity<ApiResponse<List<ChatMessageResponse>>> getChatMessages(@PathVariable("roomId") Long roomId,
                                                     @AuthenticationPrincipal UserDetails userDetails){
        List<ChatMessageResponse> messages = chatService.getMessages(roomId, userDetails.getUsername());
        return ResponseEntity.ok(new ApiResponse<>(true, "채팅 메시지 전체 조회 성공", messages));
    }

    // 채팅방 생성
    @PostMapping("/room/{productId}")
    public ResponseEntity<ApiResponse<Long>> createChatRoom(@PathVariable("productId") Long productId,
                                    @AuthenticationPrincipal UserDetails userDetails) {
        Long response = chatService.createChatRoom(userDetails.getUsername(), productId);
        return ResponseEntity.ok(new ApiResponse<>(true, "채팅방 생성 완료", response));
    }

    // 메시지 전송
    @PostMapping("room/{roomId}/message")
    public ResponseEntity<ApiResponse<Void>> sendMessage(@PathVariable("roomId") Long roomId,
                            @RequestBody ChatMessageRequest request,
                            @AuthenticationPrincipal UserDetails userDetails){
        chatService.sendMessage(userDetails.getUsername(), roomId, request);
        return ResponseEntity.ok(new ApiResponse<>(true, "메세지 전송 완료", null));
    }

    @PatchMapping("/room/{roomId}/complete")
    public ResponseEntity<ApiResponse<String>> completeTransaction(@PathVariable("roomId") Long roomId,
                                      @AuthenticationPrincipal UserDetails userDetails) {
        chatService.completeTransaction(roomId, userDetails.getUsername());
        return ResponseEntity.ok(new ApiResponse<>(true, "판매 처리 완료", null));
    }

}
