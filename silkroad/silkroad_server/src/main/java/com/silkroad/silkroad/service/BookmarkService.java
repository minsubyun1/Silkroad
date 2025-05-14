package com.silkroad.silkroad.service;

import com.silkroad.silkroad.domain.bookmark.Bookmark;
import com.silkroad.silkroad.domain.product.Product;
import com.silkroad.silkroad.domain.user.User;
import com.silkroad.silkroad.dto.bookmark.BookmarkStatusResponse;
import com.silkroad.silkroad.dto.bookmark.BookmarkedSummaryResponse;
import com.silkroad.silkroad.repository.BookmarkRepository;
import com.silkroad.silkroad.repository.ProductRepository;
import com.silkroad.silkroad.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Transactional
    public boolean toggleBookmark(String username, Long productId){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));

        // 기존에 찜이 존재하는지 확인
        return bookmarkRepository.findByUserAndProduct(user, product)
                .map(existing -> {
                    bookmarkRepository.delete(existing); // 찜 해제
                    product.setBookmarkCount(product.getBookmarkCount() - 1);
                    return false;
                })
                .orElseGet(() ->{
                   bookmarkRepository.save(new Bookmark(user, product)); // 찜 추가
                   product.setBookmarkCount(product.getBookmarkCount() + 1);
                   return true;
                });
    }

    @Transactional(readOnly = true)
    public BookmarkStatusResponse isBookmarked(String username, Long productId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));

        boolean exists = bookmarkRepository.findByUserAndProduct(user, product).isPresent();
        return new BookmarkStatusResponse(exists);
    }

    @Transactional(readOnly = true)
    public List<BookmarkedSummaryResponse> getMyBookmarks(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));

        List<Bookmark> bookmarks = bookmarkRepository.findByUser(user);

        return bookmarks.stream()
                .map(b -> new BookmarkedSummaryResponse(
                        b.getProduct().getId(),
                        b.getProduct().getTitle(),
                        b.getProduct().getPrice(),
                        b.getProduct().getImageUrl(),
                        b.getProduct().isSold(),
                        b.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

}
