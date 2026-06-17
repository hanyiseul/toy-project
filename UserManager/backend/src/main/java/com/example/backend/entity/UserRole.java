// 권한은 문자열로 직접 쓰지 않고, Enum으로 관리
// Enum 사용시 오타를 줄이고, 권한 값의 범위를 명확히 제한
package com.example.backend.entity;

// enum : 정해진 값만 사용 가능
public enum UserRole {
    USER, // 일반 사용자 권한
    ADMIN // 관리자 권한
}

