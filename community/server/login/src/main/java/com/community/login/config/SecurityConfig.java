package com.community.login.config;

import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableWebSecurity // 현재 클래스 자체를 시큐리티 자체로 활성
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true) // 메소드 권한 제어 할 수 있게
public class SecurityConfig {

  // @Autowired
  // private UserDetailService userDetailServiceImpl;

  // @Autowired
  // private JwtProvider jwtProvider;

  private AuthenticationManager authenticationManager; // 인증 관리

  // Spring Bean으로 등록 -> AuthenticationManager 객체를 스프링 컨테이너에 저장
  @Bean
  public AuthenticationManager authenticationManager(
      AuthenticationConfiguration authenticationConfiguration) throws Exception {

    // AuthenticationManager 객체 생성 -> 로그인 인증 처리 담당 객체
    this.authenticationManager = authenticationConfiguration.getAuthenticationManager();

    // 생성한 AuthenticationManager 반환
    return authenticationManager;
  }

  // Spring Security 필터 체인을 Bean으로 등록
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

    // 기본 로그인 폼 비활성화 -> Spring Security 기본 로그인 페이지 사용 안 함
    http.formLogin(login -> login.disable());

    // HTTP Basic 인증 비활성화 -> 브라우저 팝업 로그인 창 사용 안 함
    http.httpBasic(basic -> basic.disable());

    // CSRF 보호 기능 비활성화 -> JWT 기반 인증에서는 보통 사용 안 함
    http.csrf(csrf -> csrf.disable());

    // [개선] CORS 설정 추가 -> React(5173) 같은 다른 서버의 요청 허용
    http.cors(cors -> cors.configurationSource(corsConfigurationSource()));

    // 세션 설정
    http.sessionManagement(management -> management

        // STATELESS -> 세션 사용 안 함
        // JWT 방식에서 사용
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    // [개선] URL 권한 규칙 추가 (인가 처리)
    http.authorizeHttpRequests(authorize -> authorize
        // permitAll : 모든 사용자 접근 허용
        // authenticated : 로그인 했을때만 접근 가능

        // POST /login 요청은 모두 허용 -> 로그인 API
        .requestMatchers(HttpMethod.POST, "/login").permitAll()

        // POST /users 요청은 모두 허용-> 회원가입 API
        .requestMatchers(HttpMethod.POST, "/users").permitAll()

        // GET /users/info 요청은 인증 필요-> 회원 정보 조회
        .requestMatchers(HttpMethod.GET, "/users/info").authenticated()
        // PUT /users 요청은 인증 필요-> 회원 수정
        .requestMatchers(HttpMethod.PUT, "/users").authenticated()

        // DELETE /users/** 요청은 인증 필요-> 회원 삭제
        .requestMatchers(HttpMethod.DELETE, "/users/**").authenticated()

        // 그 외 요청은 모두 허용
        .anyRequest().permitAll());

    /*
     * // 사용자 인증 처리 서비스 등록 -> DB에서 회원 정보 조회
     * http.userDetailsService(userDetailServiceImpl);
     * 
     * // JWT 로그인 인증 필터 추가 -> 로그인 요청 처리
     * http.addFilterAt(
     * new JwtAuthenticationFilter(authenticationManager, jwtProvider), //
     * JwtAuthenticationFilter: 로그인 인증 및 JWT 토큰 발급
     * 
     * // UsernamePasswordAuthenticationFilter 위치에 등록
     * UsernamePasswordAuthenticationFilter.class);
     * 
     * // JWT 요청 인증 필터 추가 -> 요청 헤더의 JWT 토큰 검사
     * http.addFilterBefore(
     * new JwtRequestFilter(authenticationManager, jwtProvider), // JwtRequestFilter
     * : 로그인 여부 확인
     * 
     * // UsernamePasswordAuthenticationFilter 이전에 실행
     * UsernamePasswordAuthenticationFilter.class);
     */

    // SecurityFilterChain 반환
    return http.build();
  }
}