// DTO : API 입출력 구조 표현
// LoginRequest :  로그인 요청 데이터 받음
package com.example.backend.dto;

// 이메일, 비밀번호 입력받음
/**
 *{
 *   "email": "user@test.com",
 *   "password": "1234"
 * }
 * */
public class LoginRequest {
    // 캡슐화
    private String email;
    private String password;

    // 기본 생성자
    public LoginRequest() {
    }

    // getter : 외부에서 조회
    // 보통 생성 후 수정할 일이 없어서 getter만 두는 경우가 많음
    public String getEmail() {
        return email;
    }
    public String getPassword() {
        return password;
    }
}
