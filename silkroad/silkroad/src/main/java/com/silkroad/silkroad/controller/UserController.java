package com.silkroad.silkroad.controller;

import com.silkroad.silkroad.domain.user.User;
import com.silkroad.silkroad.dto.user.UserSignupRequest;
import com.silkroad.silkroad.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
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
                .build();

        userRepository.save(user);
        return "회원가입이 완료되었습니다.";
    }
}
