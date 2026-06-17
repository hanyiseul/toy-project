// 회원가입 로직
package com.example.securityjpaboard.service;

import com.example.securityjpaboard.domain.User;
import com.example.securityjpaboard.dto.SignupRequest;
import com.example.securityjpaboard.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    // 캡슐화
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // 비밀번호 암호화

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void signup(SignupRequest request) {
        if(userRepository.existsByUsername((request.getUsername()))) {
            throw new IllegalArgumentException("이미 사용중인 아이디입니다.");
        }

        // 사용자가 입력한 평문 비밀번호를 BCrypt 해시값으로 바꿈
        String encodePassword = passwordEncoder.encode(request.getPassword());

        User user = new User(
                request.getUsername(),
                encodePassword,
                request.getDisplayName(),
                request.getRole()
        );

        // User Entity를 저장 -> JPA가 INSERT SQL 실행
        userRepository.save(user);
    }
}
