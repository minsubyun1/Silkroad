package com.silkroad.silkroad.service;

import com.silkroad.silkroad.domain.user.User;
import com.silkroad.silkroad.dto.UserInfoResponse;
import com.silkroad.silkroad.dto.UserProfileUpdateRequest;
import com.silkroad.silkroad.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.silkroad.silkroad.dto.user.UserSignupRequest;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void singup(UserSignupRequest request) {
        if(userRepository.findByUsername(request.getUsername()).isPresent()){
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword())) // 암호화
                .name(request.getName())
                .location(request.getLocation())
                .profileImageUrl(request.getProfileImageUrl())
                .build();

        userRepository.save(user);
    }

    @Transactional
    public void updateProfile(String username, UserProfileUpdateRequest request){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다."));

                user.setName(request.getName());
                user.setLocation(request.getLocation());
                user.setProfileImageUrl(request.getProfileImageUrl());
    }

    public UserInfoResponse getMyInfo(String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));

        return new UserInfoResponse(user.getUsername(), user.getName(), user.getLocation(), user.getProfileImageUrl());
    }
}
