// DTO : API 입출력 구조 표현
// SignupRequest :  회원가입 요청 데이터 받음
package com.example.backend.dto;

// 이메일, 비밀번호, 권한 입력 받음
/**
 * {
 *   "email": "user@test.com",
 *   "password": "1234",
 *   "role": "USER"
 * }
 * */
public class SignupRequest {
    // 캡슐화
    private String email;
    private String password;
    private String role;

    // 기본 생성자
    public SignupRequest() {
    }

    // getter : 외부에서 조회
    public String getEmail() {
        return email;
    }
    public String getPassword() {
        return password;
    }
    public String getRole() {
        return role;
    }
}
