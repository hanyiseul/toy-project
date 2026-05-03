package com.example.vocab_book.repository;

import com.example.vocab_book.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {
    // findBy(컬럼이름)Containing컬럼에서 키워드가 포함된 것을 검색
    Page<Board> findByTitleContaining(String searchKeyword, Pageable pageable);

}
