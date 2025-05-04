package com.silkroad.silkroad.repository;

import com.silkroad.silkroad.domain.category.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
