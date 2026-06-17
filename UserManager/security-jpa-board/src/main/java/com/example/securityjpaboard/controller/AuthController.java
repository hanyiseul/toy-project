/**
 * GET /auth/signup
 *        ↓
 * 회원가입 화면 표시
 *        ↓
 * 사용자 입력
 *        ↓
 * POST /auth/signup
 *        ↓
 * Validation 검사
 *        ↓
 * 성공
 *        ↓
 * AuthService.signup()
 *        ↓
 * DB 저장
 *        ↓
 * redirect:/login
 *
 * 실패
 *        ↓
 * signup.html 다시 표시
 *        ↓
 * 에러 메시지 출력
 * */

package com.example.securityjpaboard.controller;

import com.example.securityjpaboard.dto.SignupRequest;
import com.example.securityjpaboard.service.AuthService;
import jakarta.validation.Valid; // dto에서 작성한 vaildation 검사 실행
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/auth") // 이 Controller의 기본 URL
public class AuthController { // 인증 관련 요청 처리 클래스
    // 회원가입 기능을 호출할 Service
    private final AuthService authService; // 수정 불가능

    // 생성자 주입
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/signup") // 회원가입 화면 보여줌
    public String signupForm(Model model) {
        // 빈 DTO 생성 후 View로 전달
        model.addAttribute("signupRequest", new SignupRequest()); // controller에서 화면으로 데이터 전달하는 코드
        return "auth/signup";
    }


    @PostMapping("/signup") // 회원가입 폼 제출 처리
    // @Valid : DTO에 작성한 검증 조건을 실행
    // BindingResult : 검증 오류가 있는지 확인
    public String signup(@Valid @ModelAttribute SignupRequest signupRequest, BindingResult bindingResult, Model model) {
        if(bindingResult.hasErrors()) { // Validation 실패 여부 확인
            return "auth/signup";
        }
        try {
            authService.signup(signupRequest); // 실제 회원가입 로직은 Service에서 처리
        } catch (IllegalArgumentException e) { // 회원각입 중 예외 발생
            model.addAttribute("signupError", e.getMessage()); // 에러 메시지 View 전달
            return "auth/signup";
        }
        return "redirect:/login";
    }
}


