package com.silkroad.silkroad.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {
    String upload(MultipartFile file, String folder);
}
