package com.example.securityjpaboard.repository;

import com.example.securityjpaboard.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    // List: 여러개 내림차순으로 조회
    // findAllByOrderByIdDesc : JpaRepository 속성 id 기준으로 내림차순 조회
    List<Post> findAllByOrderByIdDesc();
}
