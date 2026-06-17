package com.example.securityjpaboard.service;

import com.example.securityjpaboard.domain.Post;
import com.example.securityjpaboard.domain.User;
import com.example.securityjpaboard.dto.PostRequest;
import com.example.securityjpaboard.repository.PostRepository;
import com.example.securityjpaboard.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

// 게시글 관련 기능을 모아놓은 클래스
public class PostService {
    // 게시글 DB 작업 담당, 회원 DB 작업 담당
    // final : 생성 후 변경 불가
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    // 생성자 주입
    // 스프링이 자동으로 new PostService(postRepository, userRepository)를 만들어줌
    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    /**
     * findAll()
     *    ↓
     * Repository 호출
     *    ↓
     * SELECT * FROM posts ORDER BY id DESC
     *    ↓
     * 게시글 목록 반환
     * */
    @Transactional(readOnly =  true) // 조회만 수행 -> 성능 최적화
    public List<Post> findAll() {
        return postRepository.findAllByOrderByIdDesc();
    }

    // 게시글 하나만 조회
    @Transactional(readOnly = true)
    public Post findById(Long id) {
        return postRepository.findById(id)
                // 게시글 없으면 예외 발생
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));
    }

    /**
     * User 조회
     *   ↓
     * Post Entity 생성
     *   ↓
     * postRepository.save(post)
     *   ↓
     * INSERT SQL 실행
     * */
    @Transactional
    public Long create(PostRequest request, String username) {
        // 회원 조회 (없으면 예외 발생)
        User writer = userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("작성자를 찾을 수 없습니다."));

        // 게시글 객체 생성
        Post post = new Post(
                request.getTitle(),
                request.getContent(),
                writer
        );

        /**
         * INSERT INTO posts
         * (title, content, user_id)
         * VALUES (?, ?, ?)
         * */
        Post savedPost = postRepository.save(post); // sql 실행
        return savedPost.getId(); // 생성된 게시글 번호 반환
    }

    /**
     * Post 조회
     *   ↓
     * 작성자 검증
     *   ↓
     * post.update()
     *   ↓
     * 트랜잭션 종료
     *   ↓
     * Dirty Checking
     *   ↓
     * UPDATE SQL 실행
     * */
    @Transactional
    public void update(Long id, PostRequest request, String username) {
        Post post = findById(id);
        if(!canManage(post, username)) {
            throw new IllegalArgumentException("작성자 또는 관리자만 삭제할 수 있습니다.");
        }
        post.update(request.getTitle(), request.getContent());
    }

    /**
     * `Post 조회
     *    ↓
     *  작성자 검증
     *    ↓
     * */
    @Transactional
    public void delete(Long id, String username) {
        Post post = findById(id);
    }
}
