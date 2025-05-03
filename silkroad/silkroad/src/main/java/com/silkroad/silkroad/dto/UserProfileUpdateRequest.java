package com.silkroad.silkroad.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserProfileUpdateRequest {
    private String name;
    private String location;
    private String profileImageUrl;
}
