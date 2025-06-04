package com.silkroad.silkroad.dto.product;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class ProductUpdateRequest {
    private String title;
    private String description;
    private int price;
    private List<String> imageUrls;
}
