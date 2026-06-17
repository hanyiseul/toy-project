package com.example.securityjpaboard.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller // 이 파일이 컨트롤러임을 명시
public class HomeController {
    @GetMapping("/") // "/"로 접속하면 게시글 목록으로 이동
    public String home() {
        return "redirect:/posts";
    }
    @GetMapping("/login") // "/"로 접속하면 로그인 화면으로 이동
    public String loing() {
        return "auth/login";
    }

    // POST /login은 Spring Security가 처리
}
