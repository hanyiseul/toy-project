package com.example.securityjpaboard.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration // 이 파일이 config임을 명시
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    // Spring Security의 요청 필터 흐름 설정
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth // url별 접근 권한 설정
                .requestMatchers("/", "/auth/signup", "/login", "/css/**").permitAll() // 로그인 하지 않아도 접근 가능
                .requestMatchers("/post/new").hasAnyRole("USER", "ADMiN") // 로그인한 사용자만 접근 가능
                .requestMatchers("/posts/*/edit", "posts/*/delete").hasAnyRole("USER", "ADMIN") // 로그인한 사용자만 접근 가능
                .requestMatchers("/posts/**").permitAll().anyRequest().authenticated() // 로그인 한 사용자만 접근 가능
        ).formLogin(form -> form // 폼로그인 방식 사용
                .loginPage("/login") // 기본 로그인 화면이 아니라 직접 만든 로그인 화면 노출
                .defaultSuccessUrl("/posts", true).permitAll() // 로그인 성공 후 /posts로 이동
        ).logout(logout -> logout // 로그아웃 설정
                .logoutUrl("/logout") // 로그아웃 api
                .logoutSuccessUrl("/posts") // 로그아웃시 이동할 url
                .invalidateHttpSession(true) // 사용자의 세션 무효화 -> 로그아웃 할 때 사용자의 로그인 정보를 완전히 삭제하는 설정
                .deleteCookies("JSESSIONID") // 브라우저에 저장된 쿠키를 삭제함
        );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
