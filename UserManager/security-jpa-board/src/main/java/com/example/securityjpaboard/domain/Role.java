package com.example.securityjpaboard.domain;

// Spring Security에서는 권한을 사용할 때 보통 ROLE_USER, ROLE_ADMIN 형태로 처리
public enum Role {
    USER, // 기본회원
    ADMIN // 확장용
}