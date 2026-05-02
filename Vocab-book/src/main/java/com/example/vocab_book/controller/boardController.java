package com.example.vocab_book.controller;

import com.example.vocab_book.entity.Board;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller // 재실행시 controller 표시
public class boardController {
    @GetMapping("/board/write") // 어떤 url로 접근할지 지정 (localhost:8080/board/write)
    public String boardWriteForm() {
        return "boardWrite"; // 어떤 view 파일로 보낼지 넣는거
    }

    @PostMapping("/board/writedo") // post 받을 url
//    public String boardWritePro(String title, String content) { // html의 name 부분이 해당 매개변수로 들어가서 db에 전달
    public String boardWritePro(Board board) { // Board.java class 명 가져오기
        System.out.println("제목:" + board.getTitle());
        return "title=" + board.getTitle();
    }
}
