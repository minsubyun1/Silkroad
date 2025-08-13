package com.silkroad.silkroad.repository;

import com.silkroad.silkroad.domain.chat.ChatRoom;
import com.silkroad.silkroad.domain.product.Product;
import com.silkroad.silkroad.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    // 특정 유저가 참여 중인 모든 채팅방
    List<ChatRoom> findByBuyerOrSeller(User buyer, User seller);

    // 상품 + 구매자로 채팅방 존재 여부 확인 (중복 생성 방지)
    @Query("SELECT c FROM ChatRoom c WHERE c.product.id = :productId AND c.buyer.id = :buyerId")
    Optional<ChatRoom> findByProductIdAndBuyerId(
            @Param("productId") Long productId,
            @Param("buyerId") Long buyerId
    );

    // 아래 둘은 조회 페이지에서 역할 별로 필터링할 때 활용 가능
    List<ChatRoom> findByBuyer(User buyer);
    List<ChatRoom> findBySeller(User seller);
}
