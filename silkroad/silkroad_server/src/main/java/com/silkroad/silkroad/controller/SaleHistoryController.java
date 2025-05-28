package com.silkroad.silkroad.controller;

import com.silkroad.silkroad.common.dto.ApiResponse;
import com.silkroad.silkroad.dto.product.SaleHistoryResponse;
import com.silkroad.silkroad.service.SaleHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class SaleHistoryController {
    private final SaleHistoryService saleHistoryService;

    @GetMapping("/sold")
    public ResponseEntity<ApiResponse<List<SaleHistoryResponse>>> getSaleHistory(@AuthenticationPrincipal UserDetails userDetails){
        List<SaleHistoryResponse> responses = saleHistoryService.getSaleHistory(userDetails.getUsername());
        return ResponseEntity.ok(new ApiResponse<>(true, "판매 목록 조회 완료", responses));
    }
}
