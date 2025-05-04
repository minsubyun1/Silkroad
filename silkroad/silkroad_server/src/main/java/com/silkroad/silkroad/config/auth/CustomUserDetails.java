package com.silkroad.silkroad.config.auth;

import com.silkroad.silkroad.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Collections;

@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {

    private final User user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }


    @Override
    public String getPassword(){
        return user.getPassword(); // BCrypt로 암호화된 값
    }

    @Override
    public String getUsername(){
        return user.getUsername();
    }

    // 계정 만료 여부 등은 전부 true 반환
    @Override public boolean isAccountNonExpired() {return true;}
    @Override public boolean isAccountNonLocked() {return true;}
    @Override public boolean isCredentialsNonExpired() {return true;}
    @Override public boolean isEnabled() {return true;}

    public User getUser() {
        return user;
    }
}
