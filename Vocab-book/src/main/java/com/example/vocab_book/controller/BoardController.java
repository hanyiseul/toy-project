package com.example.vocab_book.controller;

import com.example.vocab_book.entity.Board;
import com.example.vocab_book.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller // 재실행시 controller 표시
public class BoardController { // 웹 요청을 받아서 처리하는 역할
    @Autowired
    private BoardService boardService; // Service 요청 받음

    @GetMapping("/board/write") // 어떤 url로 접근할지 지정 (localhost:8080/board/write)
    public String boardWriteForm() {
        return "boardWrite"; // 어떤 view 파일로 보낼지 넣는거
    }

//    @PostMapping("/board/writedo") // post 받을 url
////    public String boardWritePro(String title, String content) { // html의 name 부분이 해당 매개변수로 들어가서 db에 전달
//    public String boardWritePro(Board board) { // Board.java class 명 가져오기
//        System.out.println("제목:" + board.getTitle());
//        boardService.write(board);
//        return "redirect:/board/write";
//    }

    @PostMapping("/board/writepro") // 글 저장
    public String boardWritePro(Board board, Model model){ // form에서 넘어온 데이터를 Board 객체로 받음
        boardService.write(board); // db 저장
        model.addAttribute("message", "글 작성이 완료되었습니다.");
        model.addAttribute("searchUrl", "/board/list");

        return "message";
    }

    @GetMapping("/board/list") // 메인 페이지
    public String boardList(Model model,
                            @PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable,
                            String searchKeyword) {

        // 페이징 설정 : 0페이지부터 시작, 10개씩, id 기준 내림차순

        Page<Board> list = null; // 결과 담을 변수

        if(searchKeyword == null) { // 검색값이 없으면
            list = boardService.boardList(pageable); // 전체 조회
        } else { // 검색어가 있으면 검색
            list = boardService.boardSearchList(searchKeyword, pageable); // 검색에 해당하는 내용 노출
        }

        // 데이터가 없을 때 페이지 0 방지
        int totalPages = list.getTotalPages();
        if (totalPages == 0) {
            totalPages = 1;
        }

        int nowPage = list.getPageable().getPageNumber() + 1; // 현재페이지 : 0에서 시작하기 때문
        int startPage = Math.max(nowPage - 4, 1); // 페이지 시작번호 : 최소 1
        int endPage = Math.min(nowPage + 5, totalPages); // 페이지 끝 번호

        // html로 데이터 전달
        model.addAttribute("list", list); // boardService의 boardList를 "list"로 반환
        model.addAttribute("nowPage", nowPage);
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);

        return "boardList";
    }

    @GetMapping("/board/view") // localhost:8080/board/view?id=1
    public String boardView(Model model, Integer id) {
        model.addAttribute("board", boardService.boardView(id)); // 해당 게시글 가져오기
        return "boardView";
    }

    @GetMapping("/board/delete") // 삭제요청
    public String boardDelete(Integer id) {
        boardService.boardDelete(id); // db에서 삭제
        return "redirect:/board/list"; // 삭제 후 리스트로 이동
    }

    @GetMapping("/board/modify/{id}") // localhost:8080/board/modify/1
    public String boardModify(@PathVariable("id") Integer id, Model model) { // {이 부분이} @PathVariable() 여기에 인식됨 - url에서 id 꺼냄
        model.addAttribute("board", boardService.boardView(id)); // 상세페이지 내용이랑 수정페이지로 넘어갔을때 내용이 동일
        return "boardModify"; // 수정 페이지
    }

    @PostMapping("/board/update/{id}") // 수정 요청
    public String boardModify(@PathVariable("id") Integer id, Board board) {
        Board boardTemp = boardService.boardView(id); // 기존의 글 담겨져서 옴
        boardTemp.setTitle(board.getTitle()); // 수정할 때 넘어오는 타이틀 (기존 타이틀)
        boardTemp.setContent(board.getContent()); // 수정할 때 넘어오는 내용 (기존 내용)

        boardService.write(boardTemp); // db에 수정 내용 업데이트

        return "redirect:/board/list"; // 리스트로 이동
    }

    // 모달용 - 페이지 이동 없이 html 조각만 반환
    @GetMapping("/board/view-modal")
    public String viewModal(Integer id, Model model) {
        model.addAttribute("board", boardService.boardView(id)); // 선택한 내용 가져오기
        return "boardViewModal"; // 모달 안에 들어갈 html 파일
    }

    @GetMapping("/board/write-modal")
    public String writeModal() {
        return "boardWriteModal"; // 입력 폼만 반환
    }

    @GetMapping("/board/modify-modal/{id}") // id값에 해당하는 팝업
    public String modifyModal(@PathVariable("id") Integer id, Model model) {
        model.addAttribute("board", boardService.boardView(id)); // 선택한 내용 가져오기
        return "boardModifyModal"; // 수정폼 반환
    }
}
