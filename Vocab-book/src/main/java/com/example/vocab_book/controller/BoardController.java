package com.example.vocab_book.controller;

import com.example.vocab_book.entity.Board;
import com.example.vocab_book.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller // 재실행시 controller 표시
public class BoardController {
    @Autowired
    private BoardService boardService;

    @GetMapping("/board/write") // 어떤 url로 접근할지 지정 (localhost:8080/board/write)
    public String boardWriteForm() {
        return "boardWrite"; // 어떤 view 파일로 보낼지 넣는거
    }

    @PostMapping("/board/writedo") // post 받을 url
//    public String boardWritePro(String title, String content) { // html의 name 부분이 해당 매개변수로 들어가서 db에 전달
    public String boardWritePro(Board board) { // Board.java class 명 가져오기
        System.out.println("제목:" + board.getTitle());
        boardService.write(board);
        return "redirect:/board/write";
    }

    @GetMapping("/board/list")
    public String boardList(Model model) {
        model.addAttribute("list", boardService.boardList()); // boardService의 boardList를 "list"로 반환
        return "boardList";
    }

    @GetMapping("/board/view") // localhost:8080/board/view?id=1
    public String boardView(Model model, Integer id) {
        model.addAttribute("board", boardService.boardView(id));
        return "boardView";
    }

    @GetMapping("/board/delete")
    public String boardDelete(Integer id) {
        boardService.boardDelete(id);
        return "redirect:/board/list";
    }

    @GetMapping("/board/modify/{id}")
    public String boardModify(@PathVariable("id") Integer id, Model model) { // {이 부분이} @PathVariable() 여기에 인식됨
        model.addAttribute("board", boardService.boardView(id)); // 상세페이지 내용이랑 수정페이지로 넘어갔을때 내용이 동일
        return "boardModify";
    }
}
