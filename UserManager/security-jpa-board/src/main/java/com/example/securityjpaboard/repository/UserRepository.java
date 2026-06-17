package com.example.securityjpaboard.repository;

import com.example.securityjpaboard.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// JpaRepository<Entity의 기본 CRUD, Entity의 기본키 타입>
public interface UserRepository extends JpaRepository<User, Long> {
    // 메서드 이름만으로 username 컬럼 조회 쿼리 만들어짐
    // Optional : username 하나 찾아보고 없으면 Optional.empty() 반환
    Optional<User> findByUsername(String username);
    // username 중복 여부 확인
    boolean existsByUsername(String username);

    String username(String username);
}
