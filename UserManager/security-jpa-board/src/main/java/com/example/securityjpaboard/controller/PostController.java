package com.example.securityjpaboard.controller;

import com.example.securityjpaboard.service.PostService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller // 이 파일이 컨트롤러임을 명시
@RequestMapping("/posts")
public class PostController {
    // post 기능을 호출할 서비스
    private final PostService postService;

    // 생성자 주입
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public String list(Model model, Authentication authentication) {
        List<Post> posts = postService.findAll();
    }
}
