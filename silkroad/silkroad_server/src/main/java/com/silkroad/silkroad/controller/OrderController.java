package com.silkroad.silkroad.controller;


import com.silkroad.silkroad.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    // 구매 확정 API
    @PostMapping("/{productId}")
    public String confirmPurchase(@AuthenticationPrincipal UserDetails userDetails,
                                  @PathVariable("productId") Long productId){
        orderService.confirmPurchase(userDetails.getUsername(), productId);
        return "구매가 확정되었습니다.";
    }
}
