package com.silkroad.silkroad.controller;

import com.silkroad.silkroad.common.dto.ApiResponse;
import com.silkroad.silkroad.dto.product.SaleHistoryResponse;
import com.silkroad.silkroad.service.SaleHistoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name="판매 API", description = "판매 목록 조회를 제공합니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class SaleHistoryController {
    private final SaleHistoryService saleHistoryService;

    @Operation(summary = "판매 목록 조회", description = "판매한 목록을 조회합니다.")
    @GetMapping("/sold")
    public ResponseEntity<ApiResponse<List<SaleHistoryResponse>>> getSaleHistory(@AuthenticationPrincipal UserDetails userDetails){
        List<SaleHistoryResponse> responses = saleHistoryService.getSaleHistory(userDetails.getUsername());
        return ResponseEntity.ok(new ApiResponse<>(true, "판매 목록 조회 완료", responses));
    }
}
