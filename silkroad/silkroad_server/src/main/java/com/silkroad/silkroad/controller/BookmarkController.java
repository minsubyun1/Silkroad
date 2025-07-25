package com.silkroad.silkroad.controller;

import com.silkroad.silkroad.common.dto.ApiResponse;
import com.silkroad.silkroad.dto.bookmark.BookmarkStatusResponse;
import com.silkroad.silkroad.dto.bookmark.BookmarkedSummaryResponse;
import com.silkroad.silkroad.service.BookmarkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="찜 API", description = "찜하기, 찜 여부, 찜 목록 조회 등을 제공합니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/bookmarks")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @Operation(summary = "찜 등록", description = "찜 여부에 따라, 찜 등록 및 해제를 제공합니다.")
    @PostMapping("/{productId}/toggle")
    public ResponseEntity<ApiResponse<String>> toggleBookmark(@PathVariable("productId") Long productId,
                                                      @AuthenticationPrincipal UserDetails userDetails){
        bookmarkService.toggleBookmark(userDetails.getUsername(), productId);
        return ResponseEntity.ok(new ApiResponse<>(true, "찜 상태가 변경 완료", null));
    }

    @Operation(summary = "찜 여부", description = "해당 상품을 찜 했는지 확입합니다.")
    @GetMapping("/{productId}/status")
    public ResponseEntity<ApiResponse<BookmarkStatusResponse>> isBookmarked(@AuthenticationPrincipal UserDetails userDetails,
                                               @PathVariable("productId") Long productId) {
        BookmarkStatusResponse response = bookmarkService.isBookmarked(userDetails.getUsername(), productId);
        return ResponseEntity.ok(new ApiResponse<>(true, "찜 여부 조회 성공.", response));
    }

    @Operation(summary = "찜 목록 조회", description = "내가 찜한 상품들을 조회합니다.")
    @GetMapping
    public ResponseEntity<ApiResponse<List<BookmarkedSummaryResponse>>> getMyBookmarks(@AuthenticationPrincipal UserDetails userDetails) {
        List<BookmarkedSummaryResponse> bookmarks = bookmarkService.getMyBookmarks(userDetails.getUsername());
        return ResponseEntity.ok(new ApiResponse<>(true, "찜한 상품들 조회 성공", bookmarks));
    }
}
