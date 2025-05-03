package com.silkroad.silkroad.service;

import com.silkroad.silkroad.domain.user.User;
import com.silkroad.silkroad.dto.UserProfileUpdateRequest;
import com.silkroad.silkroad.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public void updateProfile(Long userId, UserProfileUpdateRequest request){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다."));

                user.setName(request.getName());
                user.setLocation(request.getLocation());
                user.setProfileImageUrl(request.getProfileImageUrl());
    }
}
