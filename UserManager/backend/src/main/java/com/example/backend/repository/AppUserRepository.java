package com.example.backend.repository;

import com.example.backend.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// JpaRepository<AppUser, Long>
// AppUser : Repository가 다룰 Entity 타입
// Long : AppUser Entity의 기본키 타입
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    // 이메일로 사용자 조회
    // Optional : 값이 있을 수도 있고 없을 수도 있는 객체를 감싸는 박스
    Optional<AppUser> findByEmail(String email); // 이메일로 사용자를 찾는데 있으면 AppUser 반환, 없으면 null 대신 Optional.empty() 반환
    // 회원가입시 이메일 중복 확인
    boolean existsByEmail(String email);
}