package com.silkroad.silkroad.service;

import com.silkroad.silkroad.domain.Order.Order;
import com.silkroad.silkroad.domain.chat.ChatMessage;
import com.silkroad.silkroad.domain.chat.ChatRoom;
import com.silkroad.silkroad.domain.product.Product;
import com.silkroad.silkroad.domain.user.User;
import com.silkroad.silkroad.dto.chat.ChatMessageRequest;
import com.silkroad.silkroad.dto.chat.ChatMessageResponse;
import com.silkroad.silkroad.dto.chat.ChatRoomDetailResponse;
import com.silkroad.silkroad.dto.chat.ChatRoomResponse;
import com.silkroad.silkroad.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    // 채팅방 목록 조회
    @Transactional(readOnly = true)
    public List<ChatRoomResponse> getChatRooms(String username) {
        User currentUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));

        List<ChatRoom> rooms = chatRoomRepository.findByBuyerOrSeller(currentUser, currentUser);

        return rooms.stream()
                .map(room -> {
                    // 1. 상대방 정보 추출
                    User opponent = room.getSeller().equals(currentUser) ? room.getBuyer() : room.getSeller();

                    // 2. 마지막 메세지 가져오기
                    List<ChatMessage> messages = chatMessageRepository.findByChatRoomOrderBySentAtAsc(room);
                    ChatMessage lastMessage = messages.isEmpty() ? null : messages.get(messages.size() - 1);

                    return new ChatRoomResponse(
                            room.getId(),
                            opponent.getProfileImageUrl(),
                            opponent.getName(),
                            lastMessage != null ? lastMessage.getMessage() : "(아직 메세지 없음)",
                            lastMessage != null ? lastMessage.getSentAt() : null
                    );
                })
                .collect(Collectors.toList());
    }

    // 채팅방 상세 조회(상단 - 상대방 이름, 상품 정보)
    @Transactional(readOnly = true)
    public ChatRoomDetailResponse getChatRoomDetail(Long roomId, String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("유저가 존재하지 않습니다."));

        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("채팅방이 존재하지 않습니다."));

        User opponent = room.getSeller().equals(user) ? room.getBuyer() : room.getSeller();
        Product product = room.getProduct();

        return new ChatRoomDetailResponse(
                room.getId(),
                opponent.getName(),
                product.getTitle(),
                product.getPrice(),
                product.getImageUrl(),
                room.getSeller().equals(user) // 판매 완료 처리 시 판별 위함.
        );
    }

    // 채팅방 조회 - 채팅메세지 전체 조회
    @Transactional(readOnly = true)
    public List<ChatMessageResponse> getMessages(Long roomId, String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("유저가 존재하지 않습니다."));
        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("채팅방이 존재하지 않습니다."));

        return chatMessageRepository.findByChatRoomOrderBySentAtAsc(room).stream()
                .map(msg -> new ChatMessageResponse(
                        msg.getSender().getName(),
                        msg.getSender().getProfileImageUrl(),
                        msg.getMessage(),
                        msg.getSentAt(),
                        msg.getSender().equals(user) // 내가 보낸 메세지인지 판단
                )).collect(Collectors.toList());

    }

    //  채팅방 생성
    @Transactional
    public Long createChatRoom(String username, Long productId) {
        User buyer = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));
        User seller = product.getUser();

        return chatRoomRepository.findByProductAndBuyer(product, buyer)
                .map(ChatRoom::getId)
                .orElseGet(() -> {
                    ChatRoom room = new ChatRoom(product, buyer, seller);
                    return chatRoomRepository.save(room).getId();
                });
    }

    // 메세지 생성(전송)

    @Transactional
    public void sendMessage(String username, Long roomId, ChatMessageRequest request) {
        User sender = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));
        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("채팅방이 존재하지 않습니다."));

        ChatMessage message = new ChatMessage(room, sender, request.getMessage());
        chatMessageRepository.save(message);
    }

    // 구매자 채팅 목록
    @Transactional(readOnly = true)
    public List<ChatRoomResponse> getBuyerChatRooms(String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));

        return chatRoomRepository.findByBuyer(user).stream()
                .map(room -> toResponse(room, user))
                .collect(Collectors.toList());
    }

    // 판매자 채팅 목록
    @Transactional
    public List<ChatRoomResponse> getSellerChatRooms(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));

        return chatRoomRepository.findBySeller(user).stream()
                .map(room -> toResponse(room, user))
                .collect(Collectors.toList());
    }

    private ChatRoomResponse toResponse(ChatRoom room, User currentUser){
        User opponent = room.getSeller().equals(currentUser) ? room.getBuyer() : room.getSeller();
        List<ChatMessage> messages = chatMessageRepository.findByChatRoomOrderBySentAtAsc(room);
        ChatMessage lastMessage = messages.isEmpty() ? null : messages.get(messages.size() - 1);

        return new ChatRoomResponse(
                room.getId(),
                opponent.getProfileImageUrl(),
                opponent.getName(),
                lastMessage != null ? lastMessage.getMessage() : "(아직 메세지 없음)",
                lastMessage != null ? lastMessage.getSentAt() : null
        );


    }

    // 판매 완료 처리
    @Transactional
    public void completeTransaction(Long roomId, String username) {
        User seller = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("판매자를 찾을 수 없습니다."));

        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("채팅방이 존재하지 않습니다."));

        // 권한 확인 (요청자가 판매자인지)
        if (!room.getSeller().equals(seller)) {
            throw new IllegalArgumentException("판매자만 거래를 완료할 수 있습니다.");
        }

        Product product = room.getProduct();
        User buyer = room.getBuyer();

        if(product.isSold()) {
            throw new IllegalArgumentException("이미 거래가 완료된 상품입니다.");
        }

        // 판매 완료 처리
        product.setSold(true);

        // Order 저장
        Order order = new Order(product, buyer);
        orderRepository.save(order);
    }


}
