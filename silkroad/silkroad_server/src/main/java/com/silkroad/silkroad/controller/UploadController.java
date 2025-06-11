package com.silkroad.silkroad.controller;

import com.silkroad.silkroad.common.dto.ApiResponse;
import com.silkroad.silkroad.service.FileUploadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;

@Tag(name="이미지 업로드 API", description = "이미지 업로드를 제공합니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/upload")
public class UploadController {

    private final FileUploadService fileUploadService;

    @Operation(summary = "프로필 이미지 업로드 (임시용)", description = "\"단일 이미지 파일을 업로드하고 이미지 URL을 반환합니다.\\n\\n\" +\n" +
            "                  \"- 현재 서비스에서는 사용되지 않지만, 이미지 업로드 방식 확인 또는 테스트 용도로 활용할 수 있습니다.\\n\" +\n" +
            "                  \"- Content-Type은 multipart/form-data 형식이어야 하며, key는 'file'입니다.\\n\" +\n" +
            "                  \"- 향후 프론트에서 이미지 업로드 선처리 방식 도입 시 재사용 가능합니다.\"")
    @PostMapping("/profile-image")
    public ResponseEntity<ApiResponse<String>> uploadProfileImage(@RequestParam("file") MultipartFile file) {
        // ✅ 단일 파일을 리스트로 감싸기
        String imageUrl = fileUploadService.upload(Collections.singletonList(file), "profile").get(0);
        return ResponseEntity.ok(new ApiResponse<>(true, "이미지 업로드 완료", imageUrl));
    }
}
