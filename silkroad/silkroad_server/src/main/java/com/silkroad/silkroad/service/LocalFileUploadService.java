package com.silkroad.silkroad.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class LocalFileUploadService implements FileUploadService{
    
    @Value("${file.upload.path:/home/ec2-user/uploads/}")
    private String basePath;
    
    @Value("${file.upload.url-prefix:}")
    private String urlPrefix;

    @Override
    public List<String> upload(List<MultipartFile> files, String folder, HttpServletRequest request) {
        List<String> uploadedUrls = new ArrayList<>();
        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                uploadedUrls.add(uploadSingle(file, folder, request));
            }
        }
        return uploadedUrls;
    }

    private String uploadSingle(MultipartFile file, String folder, HttpServletRequest request) {
        if (file.isEmpty()) {
            throw new RuntimeException("업로드할 파일이 없습니다.");
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.isEmpty()) {
            throw new RuntimeException("파일명이 유효하지 않습니다.");
        }

        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String savedName = UUID.randomUUID() + extension;

        String uploadDir = basePath + folder;
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            if (!dir.mkdirs()) {
                throw new RuntimeException("디렉토리 생성에 실패했습니다: " + uploadDir);
            }
        }

        File saveFile = new File(dir, savedName);
        try {
            file.transferTo(saveFile);
        } catch (IOException e) {
            throw new RuntimeException("파일 저장 실패: " + e.getMessage(), e);
        }

        // URL 생성
        if (urlPrefix != null && !urlPrefix.isEmpty()) {
            return urlPrefix + "/uploads/" + folder + "/" + savedName;
        } else {
            String host = request.getServerName();
            int port = request.getServerPort();
            String protocol = request.isSecure() ? "https" : "http";
            return protocol + "://" + host + ":" + port + "/uploads/" + folder + "/" + savedName;
        }
    }
}
