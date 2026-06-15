package com.example.javatodolist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JavaTodoListApplication {

    public static void main(String[] args) {
        SpringApplication.run(JavaTodoListApplication.class, args);
    }

}

/**
 * 브라우저
 *    │
 *    │ GET /todos
 *    ▼
 * TodoController
 *    │
 *    ▼
 * TodoService
 *    │
 *    ▼
 * TodoRepository
 *    │
 *    ▼
 * List<Todo>
 *
 * 응답(JSON)
 *    ▲
 *    │
 * 브라우저
 * */