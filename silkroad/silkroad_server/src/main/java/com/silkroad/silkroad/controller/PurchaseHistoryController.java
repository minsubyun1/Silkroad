package com.silkroad.silkroad.controller;

import com.silkroad.silkroad.common.dto.ApiResponse;
import com.silkroad.silkroad.dto.order.PurchaseHistoryResponse;
import com.silkroad.silkroad.service.PurchaseHistoryService;
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

@Tag(name="구매 API", description = "구매 목록 조회를 제공합니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class PurchaseHistoryController {
    private final PurchaseHistoryService purchaseHistoryService;

    @Operation(summary = "구매 목록 조회", description = "구매한 목록을 조회합니다.")
    @GetMapping("/purchased")
    public ResponseEntity<ApiResponse<List<PurchaseHistoryResponse>>> getPurchaseHistory(@AuthenticationPrincipal UserDetails userDetails){
        List<PurchaseHistoryResponse> responses = purchaseHistoryService.getPurchaseHistory(userDetails.getUsername());
        return ResponseEntity.ok(new ApiResponse<>(true, "구매 목록 조회 완료", responses));
    }

}
