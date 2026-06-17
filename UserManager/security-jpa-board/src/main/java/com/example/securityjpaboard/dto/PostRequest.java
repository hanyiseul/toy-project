package com.example.securityjpaboard.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.thymeleaf.context.IContext;

// 작성자는 화면에서 받는게 아니라 현재 로그인한 사용자 정보로 서버에서 결정
public class PostRequest {
    // 유효성 검사
    @NotBlank(message = "제목을 입력하세요")
    @Size(max = 200, message = "제목은 200자 이하로 입력하세요.")
    private String title; // 캡슐화

    @NotBlank(message = "내용을 입력하세요.")
    private String content;

    // 기본 생성자
    public PostRequest() {
    }

    public PostRequest(String title, String gocntent) {
        this.title = title;
        this.content = content;
    }

    // getter
    public String getTitle() {
        return title;
    }
    public String getContent() {
        return content;
    }
    
    // setter
    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
