package com.silkroad.silkroad.controller;

import com.silkroad.silkroad.domain.user.User;
import com.silkroad.silkroad.dto.UserInfoResponse;
import com.silkroad.silkroad.dto.UserProfileUpdateRequest;
import com.silkroad.silkroad.dto.user.UserSignupRequest;
import com.silkroad.silkroad.repository.UserRepository;
import com.silkroad.silkroad.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.util.StopWatch;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping
    public String signup(@RequestBody UserSignupRequest request){
        if(userRepository.findByUsername(request.getUsername()).isPresent()){
            return "이미 존재하는 이이디입니다.";
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword())) // 암호화
                .name(request.getName())
                .location(request.getLocation())
                .profileImageUrl(request.getProfileImageUrl())
                .build();

        userRepository.save(user);
        return "회원가입이 완료되었습니다.";
    }

    @PatchMapping("/{userId}/profile")
    public String updateProfile(@PathVariable("userId") Long userId, @RequestBody UserProfileUpdateRequest request){
        userService.updateProfile(userId, request);
        return "프로필이 성공적으로 수정되었습니다.";
    }

    @GetMapping("/me")
    public UserInfoResponse getMyInfo(@AuthenticationPrincipal UserDetails userDetails){

        return userService.getMyInfo(userDetails.getUsername());


    }


}
