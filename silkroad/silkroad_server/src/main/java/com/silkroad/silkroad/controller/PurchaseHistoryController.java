package com.silkroad.silkroad.controller;

import com.silkroad.silkroad.dto.order.PurchaseHistoryResponse;
import com.silkroad.silkroad.service.PurchaseHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class PurchaseHistoryController {
    private final PurchaseHistoryService purchaseHistoryService;

    @GetMapping("/purchased")
    public List<PurchaseHistoryResponse> getPurchaseHistory(@AuthenticationPrincipal UserDetails userDetails){
        return purchaseHistoryService.getPurchaseHistory(userDetails.getUsername());
    }
}
