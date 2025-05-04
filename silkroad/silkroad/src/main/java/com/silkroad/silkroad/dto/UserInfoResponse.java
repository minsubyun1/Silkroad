package com.silkroad.silkroad.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserInfoResponse {
    private String username;
    private String name;
    private String location;
    private String profileImageUrl;
}
