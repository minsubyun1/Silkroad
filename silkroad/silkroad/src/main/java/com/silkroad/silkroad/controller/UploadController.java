package com.silkroad.silkroad.controller;

import com.silkroad.silkroad.service.FileUploadService;
import lombok.RequiredArgsConstructor;
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
    public String uploadProfileImage(@RequestParam("file") MultipartFile file) {
        return fileUploadService.upload(file, "profile");
    }
}
