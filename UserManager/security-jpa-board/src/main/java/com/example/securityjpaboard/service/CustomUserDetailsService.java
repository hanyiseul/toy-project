// Spring Security가 로그인할 사용자를 DB에서 조회하는 클래스 작성
package com.example.securityjpaboard.service;

import com.example.securityjpaboard.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // 이 파일이 service임을 명시
// implements : 인터페이스를 구현
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository; // 수정 불가능

    // 생성자 주입
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Spring Security가 로그인 시 자동 호출하는 메서드
    @Override
    @Transactional(readOnly = true) // 데이터를 조회만 하고 수정하지 않음
    // loadUserByUsername : Spring Security의 UserDetailsService 인터페이스에 원래 정의되어 있는 메서드
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.example.securityjpaboard.domain.User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("회원을 찾을 수 없습니다."));
        return new org.springframework.security.core.userdetails.User( // org.springframework.security.core.userdetails.User
                        user.getUsername(),
                        user.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        );
    }
}
