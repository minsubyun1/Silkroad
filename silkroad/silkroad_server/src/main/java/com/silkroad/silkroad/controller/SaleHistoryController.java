package com.silkroad.silkroad.controller;

import com.silkroad.silkroad.dto.product.SaleHistoryResponse;
import com.silkroad.silkroad.service.SaleHistoryService;
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
public class SaleHistoryController {
    private final SaleHistoryService saleHistoryService;

    @GetMapping("/sold")
    public List<SaleHistoryResponse> getSaleHistory(@AuthenticationPrincipal UserDetails userDetails){
        return saleHistoryService.getSaleHistory(userDetails.getUsername());
    }
}
