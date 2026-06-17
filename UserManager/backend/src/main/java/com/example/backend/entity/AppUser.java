// Entity : DB 테이블 구조를 표현
package com.example.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity // 이 파일이 Entity임을 명시
@Table(name="users")
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO_INCREMENT
    private Long id;

    // nullable : null, legth = 허용길이, updatable : update 쿼리에서 해당 컬럼 제외
    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Enumerated(EnumType.STRING) // enum 사용
    @Column(nullable = false, length = 20)
    private UserRole role;

    @CreationTimestamp // 현재 시간 자동 등록
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    protected AppUser() {
        // Entity 객체 생성시 기보 생성자 필요
        // 외부에서 무분별하게 사용하지 못하도록 protected 사용
    }
}
