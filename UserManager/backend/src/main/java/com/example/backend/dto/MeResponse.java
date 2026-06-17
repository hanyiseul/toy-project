// DTO : API 입출력 구조 표현
// MeResponse : 현재 인증된 사용자 정보를 반환
package com.example.backend.dto;

// 인증된 사용자 정보를 확인하는 API에서는 현재 사용자의 이메일과 권한을 반환
/**
 * {
 *   "email": "user@test.com",
 *   "authorities": [
 *     {
 *       "authority": "ROLE_USER"
 *     }
 *   ],
 *   "message": "인증된 사용자입니다."
 * }
 * */
public class MeResponse {
}
