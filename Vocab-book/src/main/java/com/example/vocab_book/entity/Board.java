package com.example.vocab_book.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity // 클래스가 db의 테이블을 의미한다는 것
@Data // 귀찮은 코드 자동 생성 패키지
public class Board {
    @Id // pk
    @GeneratedValue(strategy = GenerationType.IDENTITY) // db 자동 생성 표시 (IDENTITY 자동증가)
    private Integer id;

    private String title;
    private String content;
}
