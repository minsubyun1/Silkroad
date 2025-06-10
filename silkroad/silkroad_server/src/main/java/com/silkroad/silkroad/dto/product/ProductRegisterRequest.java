package com.silkroad.silkroad.dto.product;

import com.silkroad.silkroad.domain.product.ProductCategory;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter @Setter
public class ProductRegisterRequest {
    private String title;
    private String description;
    private int price;
    private ProductCategory category;
    private List<MultipartFile> imageFiles; // 다중 이미지 업로드
}