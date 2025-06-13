package com.silkroad.silkroad.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileUploadService {
        List<String> upload(List<MultipartFile> files, String folder, HttpServletRequest request);
}
