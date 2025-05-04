package com.silkroad.silkroad.repository;

import com.silkroad.silkroad.domain.chat.ChatRoom;
import com.silkroad.silkroad.domain.product.Product;
import com.silkroad.silkroad.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    // 전체 채팅방 목록
    List<ChatRoom> findByBuyerOrSeller(User buyer, User seller);

    // 상품 + 구매자 기준으로 채팅방 찾기 (정확한 방법)
    Optional<ChatRoom> findByProductAndBuyer(Product product, User buyer);

    // 구매자 기준 채팅방 목록 조회
    List<ChatRoom> findByBuyer(User buyer);

    // 판매자 기준 채팅방 목록 조회
    List<ChatRoom> findBySeller(User seller);
}
