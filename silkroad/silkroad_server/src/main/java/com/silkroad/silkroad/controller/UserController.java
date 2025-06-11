package com.silkroad.silkroad.controller;

import com.silkroad.silkroad.common.dto.ApiResponse;
import com.silkroad.silkroad.domain.user.User;
import com.silkroad.silkroad.dto.UserInfoResponse;
import com.silkroad.silkroad.dto.UserProfileUpdateRequest;
import com.silkroad.silkroad.dto.user.UserSignupRequest;
import com.silkroad.silkroad.repository.UserRepository;
import com.silkroad.silkroad.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.util.StopWatch;

@Tag(name="회원 API", description = "회원가입, 프로필 수정, 프로필 조회 등을 제공합니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Operation(summary = "회원가입", description = "회원 가입 정보를 받아 회원 정보를 저장합니다.")
    @PostMapping
    public ResponseEntity<ApiResponse<String>> signup(@RequestBody UserSignupRequest request){
        userService.singup(request);
        return ResponseEntity.ok(new ApiResponse<>(true, "회원가입이 완료되었습니다.", null));
    }

    @Operation(summary = "프로필 수정", description = "이름, 주소, 프로필 사진 등의 정보를 수정합니다.")
    @PatchMapping("me")
    public ResponseEntity<ApiResponse<String>> updateProfile(@AuthenticationPrincipal UserDetails userDetails, @RequestBody UserProfileUpdateRequest request){
        userService.updateProfile(userDetails.getUsername(), request);
        return ResponseEntity.ok(new ApiResponse<>(true, "프로필 수정 완료", null));
    }

    @Operation(summary = "프로필 조회", description = "회원 정보를 조회합니다.")
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserInfoResponse>> getMyInfo(@AuthenticationPrincipal UserDetails userDetails){

       UserInfoResponse profile = userService.getMyInfo(userDetails.getUsername());
       return ResponseEntity.ok(new ApiResponse<>(true, "내 정보 조회", profile));

    }


}
