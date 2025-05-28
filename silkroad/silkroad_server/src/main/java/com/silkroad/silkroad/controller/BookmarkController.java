package com.silkroad.silkroad.controller;

import com.silkroad.silkroad.common.dto.ApiResponse;
import com.silkroad.silkroad.dto.bookmark.BookmarkStatusResponse;
import com.silkroad.silkroad.dto.bookmark.BookmarkedSummaryResponse;
import com.silkroad.silkroad.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bookmarks")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @PostMapping("/{productId}/toggle")
    public ResponseEntity<ApiResponse<String>> toggleBookmark(@PathVariable("productId") Long productId,
                                                      @AuthenticationPrincipal UserDetails userDetails){
        bookmarkService.toggleBookmark(userDetails.getUsername(), productId);
        return ResponseEntity.ok(new ApiResponse<>(true, "찜 상태가 변경 완료", null));
    }

    @GetMapping("/{productId}/status")
    public ResponseEntity<ApiResponse<BookmarkStatusResponse>> isBookmarked(@AuthenticationPrincipal UserDetails userDetails,
                                               @PathVariable("productId") Long productId) {
        BookmarkStatusResponse response = bookmarkService.isBookmarked(userDetails.getUsername(), productId);
        return ResponseEntity.ok(new ApiResponse<>(true, "찜 여부 조회 성공.", response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<BookmarkedSummaryResponse>>> getMyBookmarks(@AuthenticationPrincipal UserDetails userDetails) {
        List<BookmarkedSummaryResponse> bookmarks = bookmarkService.getMyBookmarks(userDetails.getUsername());
        return ResponseEntity.ok(new ApiResponse<>(true, "찜한 상품들 조회 성공", bookmarks));
    }
}
