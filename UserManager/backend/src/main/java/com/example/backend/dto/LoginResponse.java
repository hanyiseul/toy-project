// DTO : API 입출력 구조 표현
// LoginResponse : 로그인 성공 후 JWT를 반환
package com.example.backend.dto;

// 로그인에 성공하면 서버는 JWT Access Token을 응답으로 반환
/**
 *{
 *   "email": "user@test.com",
 *   "password": "1234"
 * }
 * */

public class LoginResponse {
    // 캡슐화
    private String tokenType ;
    private String accessToken;
    private String email;
    private String role;
    private long expiresInMs;

    // 기본 생성자
    public LoginResponse(String accessToken, String email, String role, long expiresInMs) {
        // 매개변수
        // 객체의 필드 = 생성자 매개변수
        this.tokenType = "Bearer"; // 클라이언트가 Authorization Header를 구성할 때 사용
        this.accessToken = accessToken; // 클라이언트는 응답으로 받은 accessToken을 Authorization: Bearer accessToken값으로 전송
        this.email = email;
        this.role = role;
        this.expiresInMs = expiresInMs;
    }

    // getter
    public String getTokenType() {
        return tokenType;
    }
    public String getAccessToken() {
        return accessToken;
    }
    public String getEmail() {
        return email;
    }
    public String getRole() {
        return role;
    }
    public long getExpiresInMs() {
        return expiresInMs;
    }
}
