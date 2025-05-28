package com.silkroad.silkroad.common.exception;

import com.silkroad.silkroad.common.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Void>> handlerIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(
                new ApiResponse<>(false, e.getMessage(), null)
        );
    }
}
