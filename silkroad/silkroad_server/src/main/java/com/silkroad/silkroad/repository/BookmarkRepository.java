package com.silkroad.silkroad.repository;

import com.silkroad.silkroad.domain.bookmark.Bookmark;
import com.silkroad.silkroad.domain.product.Product;
import com.silkroad.silkroad.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    // 특정 유저가 찜한 상품 목록 조회 (마이페이지 관심 목록)
    List<Bookmark> findByUser(User user);

    // 특정 상품을 찜한 유저 목록 조회 (찜 수 세기 등)
    List<Bookmark> findByProduct(Product product);

    // 특정 유저가 특정 상품을 찜했는지 조회(찜 여부 확인)
    Optional<Bookmark> findByUserAndProduct(User user, Product product);
}
