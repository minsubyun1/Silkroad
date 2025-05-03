package com.silkroad.silkroad.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class LocalFileUploadService implements FileUploadService{
    private static final String BASE_PATH = "src/main/resources/static/uploads/";

    @Override
    public String upload(MultipartFile file, String folder){
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String savedName = UUID.randomUUID() + extension;

        String uploadDir = new File(BASE_PATH + folder).getAbsolutePath();
        File dir = new File(uploadDir);
        if(!dir.exists()){
            dir.mkdirs();
        }

        File saveFile = new File(dir, savedName);
        try {
            file.transferTo(saveFile);
        } catch (IOException e){
            throw new RuntimeException("파일 저장에 실패했습니다.", e);
        }

        // 브라우저에서 접근 가능한 경로로 반환
        return "/uploads/" + folder + "/" + savedName;

    }
}
