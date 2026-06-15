package com.example.javatodolist;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// 어노테이션 : http 요청 처리 컨트롤러
@RestController
public class TodoController { // 브라우저 요청 받는 클래스
    // 서비스 객체 생성
    private  TodoService service = new TodoService();

    // GET 요청 매핑
    @GetMapping("/todos")
    public List<Todo> getTodos() { // Todo 목록을 반환하는 메서드
        return service.getTodos(); // 서비스 호출
    }
}
/**
 * 브라우저
 *  ↓
 * GET /todos
 *  ↓
 * TodoController.getTodos()
 *  ↓
 * TodoService.getTodos()
 *  ↓
 * TodoRepository.findAll()
 *  ↓
 * List<Todo> 반환
 * */