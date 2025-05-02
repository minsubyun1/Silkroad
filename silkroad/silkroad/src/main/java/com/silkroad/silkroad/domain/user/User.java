package com.silkroad.silkroad.domain.user;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // PK

    @Column(nullable = false, unique = true)
    private String username; // 로그인 아이디 (ex. 이메일 또는 고유 아이디)

    @Column(nullable = false)
    private String password; // 비밀번호 (암호화 저장)

    @Column(nullable = false)
    private String name; // 사용자 이름

//    @Column(nullable = false)
//    private String phone; // 연락처

//    private String profileImageUrl; // 프로필 사진 경로 (Optional)

    private String location; // 거주 지역(Optional)

    // 추후 JWT 인증용으로 추가할 수도 있음 ㄷ
}
