package com.silkroad.silkroad.controller;

import com.silkroad.silkroad.dto.bookmark.BookmarkStatusResponse;
import com.silkroad.silkroad.dto.bookmark.BookmarkedSummaryResponse;
import com.silkroad.silkroad.service.BookmarkService;
import lombok.RequiredArgsConstructor;
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
    public String toggleBookmark(@PathVariable("productId") Long productId,
                                 @AuthenticationPrincipal UserDetails userDetails){
        bookmarkService.toggleBookmark(userDetails.getUsername(), productId);
        return "찜 상태가 변경되었습니다.";
    }

    @GetMapping("/{productId}/status")
    public BookmarkStatusResponse isBookmarked(@AuthenticationPrincipal UserDetails userDetails,
                                               @PathVariable("productId") Long productId) {
        return bookmarkService.isBookmarked(userDetails.getUsername(), productId);
    }

    @GetMapping
    public List<BookmarkedSummaryResponse> getMyBookmarks(@AuthenticationPrincipal UserDetails userDetails) {
        return bookmarkService.getMyBookmarks(userDetails.getUsername());
    }
}
