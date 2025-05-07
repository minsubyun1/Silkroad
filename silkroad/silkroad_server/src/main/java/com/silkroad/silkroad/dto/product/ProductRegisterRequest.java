package com.silkroad.silkroad.dto.product;

import com.silkroad.silkroad.domain.product.ProductCategory;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProductRegisterRequest {
    private String title;
    private String description;
    private int price;
    private ProductCategory category;
    private String imageUrl;
}
