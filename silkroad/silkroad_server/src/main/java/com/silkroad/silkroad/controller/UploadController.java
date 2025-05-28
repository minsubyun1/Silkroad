package com.silkroad.silkroad.controller;

import com.silkroad.silkroad.common.dto.ApiResponse;
import com.silkroad.silkroad.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/upload")
public class UploadController {

    private final FileUploadService fileUploadService;

    @PostMapping("/profile-image")
    public ResponseEntity<ApiResponse<String>> uploadProfileImage(@RequestParam("file") MultipartFile file) {
        fileUploadService.upload(file, "profile");
        return ResponseEntity.ok(new ApiResponse<>(true, "이미지 업로드 완료", null));
    }
}
