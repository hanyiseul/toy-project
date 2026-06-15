package com.example.javatodolist;

import java.util.Scanner;

public class TodoTest {

    public static void main(String[] args) {

        TodoService service = new TodoService();
        Scanner scanner = new Scanner(System.in);

        System.out.print("할 일 입력: ");
        String title = scanner.nextLine();

        service.addTodo(1L, title);

        for (Todo todo : service.getTodos()) {
            System.out.println(todo.getTitle());
        }
    }
}