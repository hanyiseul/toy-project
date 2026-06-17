package com.example.securityjpaboard.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity // 이 파일이 Entity임을 명시
@Table(name = "posts") // 테이블 이름 posts
public class Post {

    // id, pk, auto_increment
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // title, not null, varchar(200)
    @Column(nullable = false, length = 200)
    private String title;

    // content, not null, Lob (긴 본문 문자열을 저장하기 위해 사용)
    @Lob
    @Column(nullable = false)
    private String content;

    // writer, not null, fk = user_id (writer와 연결된 외래키 컬럼 이름)
    @ManyToOne(fetch = FetchType.LAZY) // N : 1 관계 (다대일)
    @JoinColumn(name = "user_id", nullable = false)
    private User writer;

    // createdAt, not null
    @Column(nullable = false)
    private LocalDateTime createdAt;

    // updatedAt
    private LocalDateTime updatedAt;

    // 기본 생성자
    protected Post() {
    }

    // 사용자 정의 생성자 (Post)
    public Post(String title, String content, User writer) {
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.createdAt = LocalDateTime.now();
    }

    // 사용자 정의 생성자 (update)
    public void update(String title, String content) {
        this.title = title;
        this.content = content;
        this.updatedAt = LocalDateTime.now();
    }

    // 이 게시글을 작성한 사람이 username인지 확인
    public boolean isWrittenBy(String username) {
        return this.writer.getUsername().equals(username);
    }

    // getter : 외부에서 캡슐화 조회
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public User getWriter() {
        return writer;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}