package com.silkroad.silkroad.repository;

import com.silkroad.silkroad.domain.category.Category;
import com.silkroad.silkroad.domain.product.Product;
import com.silkroad.silkroad.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // 특정 카데고리의 상품들 조회
    List<Product> findByCategory(Category category);

    // 특정 판매자가 등록한 상품들 조회
    List<Product> findByUser(User user);

    // 판매중인 상품만 조회
    List<Product> findByIsSoldFalse();
}
