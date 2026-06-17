package com.example.securityjpaboard.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity // 이 파일이 Entity임을 명시
@Table(name = "users") // Table 이름 users
public class User {

    // id, pk, auto_increment
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // username, not null, unique, varchar 50
    @Column(nullable = false, unique = true, length = 50)
    private String username;

    // password, not null
    @Column(nullable = false)
    private String password;

    // displayName, not null, varchar 30
    @Column(nullable = false, length = 30)
    private String displayName;

    // role, not null, varchar 20, Role Enum 값을 문자열로 저장
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Role role;

    // createdAt, not null
    @Column(nullable = false)
    private LocalDateTime createdAt;

    // 기본 생성자 (외부에서 아무 값 없이 객체를 생성하지 못하게 하기 위해 protected로 둠
    protected User() {
        // 객체만 만들고 필드는 비어 있는 상태
        // 주로 JPA가 DB에서 조회한 데이터를 User 객체로 만들 때 사용
    }

    // 사용자 정의 생성자
    // 객체를 생성하면서 필요한 값을 바로 넣어줌
    public User(String username, String password, String displayName, Role role) {
        this.username = username;
        this.password = password;
        this.displayName = displayName;
        this.role = role;
        this.createdAt = LocalDateTime.now();
    }

    // getter: 외부에서 캡슐화 조회시
    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getDisplayName() {
        return displayName;
    }

    public Role getRole() {
        return role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}