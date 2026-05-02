package com.example.vocab_book.repository;

import com.example.vocab_book.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository; // db 작업을 직접 해주는 인터페이스
import org.springframework.stereotype.Repository;

@Repository // db랑 직접 연결되는 클래스 표시용
public class BoardRepository extends JpaRepository<Board, Integer> { // extends 상속

}
