package com.silkroad.silkroad.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSignupRequest {
    private String username;
    private String password;
    private String name;
    private String location;
    private String profileImageUrl;
}
