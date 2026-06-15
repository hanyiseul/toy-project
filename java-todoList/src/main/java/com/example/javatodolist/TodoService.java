package com.example.javatodolist;

import java.util.List;

public class TodoService {
    // TodoRepository :  타입 변수 생성
    // TodoRepository repository : TodoRepository 객체를 담을 수 있는 변수(repository)를 만듦
    // new TodoRepository(): TodoRepository 객체를 실제로 하나 만듦
    private TodoRepository repository = new TodoRepository(); // TodoRepository 객체를 생성하여 repository 변수에 저장

    // 할일 추가
    public void addTodo (Long id, String title) {
        Todo todo = new Todo(id, title); // Todo 객체 생성
        repository.save(todo); // Repository에 저장
    }

    // 전체 조회
    public List<Todo> getTodos() {
        return repository.findAll();
    }

    // 더미데이터
    public TodoService() {
        repository.save(new Todo(1L, "자바 공부"));
        repository.save(new Todo(2L, "운동"));
    }
}
