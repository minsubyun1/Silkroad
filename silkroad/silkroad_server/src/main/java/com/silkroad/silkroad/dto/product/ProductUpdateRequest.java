package com.silkroad.silkroad.dto.product;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProductUpdateRequest {
    private String title;
    private String description;
    private int price;
    private String imageUrl;
}
