package com.example.javatodolist;

public class Todo {
    // 캡슐화
    private Long id; // 할 일 번호
    private String title; // 할 일 제목
    private boolean completed; // 완료 여부

    // 생성자 : 객체를 생성할 때 실행되는 특별한 메서드
    public Todo(Long id, String title) { // todo 객체를 생성할 때 초기값을 넣어주는 생성자
        this.id = id; // this :  현재 객체
        this.title = title;
        this.completed = false;
    }

    // Getter : private으로 숨겨진 id값을 밖에서 읽을 수 있게 해주는 메서드
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public boolean isCompleted() {
        return completed;
    }
}

/**
 * 사용자
 *    ↓
 * TodoService.addTodo()
 *    ↓
 * Todo 객체 생성
 *    ↓
 * TodoRepository.save()
 *    ↓
 * List<Todo> 저장
 * */