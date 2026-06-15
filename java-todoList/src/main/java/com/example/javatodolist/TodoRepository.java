// 할 일을 저장하는 창고
package com.example.javatodolist; // 패키지명

import java.util.ArrayList;
import java.util.List;

public class TodoRepository { // 객체를 만들기 위한 설계도

    // List : 여러 개의 데이터를 저장하는 자료구조
    // ArrayList : List의 실현 구현체 (자동으로 크기가 늘어나는 배열)
    private List<Todo> todos = new ArrayList<>(); // 현재 클래스 안에서만 사용 가능 (캡슐화)

    // Todo todo (매개변수(Parameter) : 저장할 Todo 객체를 받음
    public void save(Todo todo) { // 할 일 저장 기능
        todos.add(todo); // 리스트에 데이터 추가
    }

    // 전체 조회 메서드
    public List<Todo> findAll() {
        return todos;
    }
}
