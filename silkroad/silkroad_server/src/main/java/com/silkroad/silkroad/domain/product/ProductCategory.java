package com.silkroad.silkroad.domain.product;

public enum ProductCategory {
    DIGITAL("디지털 기기"),
    FASHION("의류"),
    BEAUTY("뷰티"),
    SPORTS("스포츠"),
    ETC("기타");

    private final String displayName;

    ProductCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
