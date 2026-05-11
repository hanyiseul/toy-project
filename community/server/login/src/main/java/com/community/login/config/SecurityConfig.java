// 프로젝트 전체의 로그인/인증/권한 처리 방식을 설정

// 패키지 선언
package com.community.login.config; // src/main/java/com/community/login/config와 연결

import java.util.Arrays; // 다른 클래스 가져오기 Arrays 클래스 안 기능 사용 가능

import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// @어노테이션 : 이 클래스는 설정 클래스이다 선언
@Configuration
@EnableWebSecurity // 현재 클래스 자체를 시큐리티 자체로 활성
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true) // 메소드 권한 제어 할 수 있게
public class SecurityConfig { // 보안 정책 담당

  // @Autowired
  // private UserDetailService userDetailServiceImpl;

  // @Autowired
  // private JwtProvider jwtProvider;

  // (필드) 클래스 내부 변수 - 객체가 계속 가지고 있는 값
  // private : 외부 접근 차단 = 현재 클래스 안에서만 사용 가능
  private AuthenticationManager authenticationManager; // 인증 관리

  // Spring Bean으로 등록 -> AuthenticationManager 객체를 스프링 컨테이너에 저장
  @Bean
  // 매개변수(parameter) : 스프링 자동 주입 (DI:의존성주입)
  public AuthenticationManager authenticationManager( // 접근 제어자 반환 타입 메서드명(매개변수)
      AuthenticationConfiguration authenticationConfiguration) throws Exception { // throws Exception : 예외 발생 가능성 체크

    // this: 객체 자기 자신 -> 현재 클래스의 필드 가르킴
    // AuthenticationManager 객체 생성 -> 로그인 인증 처리 담당 객체
    this.authenticationManager = authenticationConfiguration.getAuthenticationManager();

    // 생성한 AuthenticationManager 반환
    return authenticationManager;
  }

  // Spring Security 필터 체인을 Bean으로 등록
  @Bean
  // SecurityFilterChain: 보안 필터들의 실행 순서 체인
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

    // 람다식 (매개변수 -> 실행코드)
    // http.formLogin(login -> login.disable());
    /**
     * (new Customizer<FormLoginConfigurer<HttpSecurity>>() {
     * 
     * @Override
     *           public void customize(FormLoginConfigurer<HttpSecurity> login) {
     *           login.disable();
     *           }
     *           });
     */

    // 기본 로그인 폼 비활성화 -> Spring Security 기본 로그인 페이지 사용 안 함
    http.formLogin(login -> login.disable());

    // HTTP Basic 인증 비활성화 -> 브라우저 팝업 로그인 창 사용 안 함
    http.httpBasic(basic -> basic.disable());

    // CSRF 보호 기능 비활성화 -> JWT 기반 인증에서는 보통 사용 안 함
    http.csrf(csrf -> csrf.disable());

    // [개선] CORS 설정 추가 -> React(5173) 같은 다른 서버의 요청 허용
    http.cors(cors -> cors.configurationSource(corsConfigurationSource()));

    // 세션 설정
    // management.sessionCreationPolicy(...) : 메서드 체이닝 -> 메서드가 자기 자신 객체 반환
    http.sessionManagement(management -> management
        // JWT 방식에서 사용
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
    // SessionCreationPolicy.STATELESS : enum (고정 상수 집합) -> STATELESS -> 세션 사용 안 함

    // [개선] URL 권한 규칙 추가 (인가 처리)
    http.authorizeHttpRequests(authorize -> authorize
        // permitAll : 모든 사용자 접근 허용
        // authenticated : 로그인 했을때만 접근 가능

        // HttpMethod.POST : 요청 종류를 모두 enum으로 표현
        // requestMatchers : 특정 URL + 요청 방식 지정

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
        .anyRequest().permitAll()); // 비로그인 가능

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

  // Cors : 서로 다른 사이트 간에서 자원을 공유
  @Bean
  // 인터페이스 : 규칙만 정한 틀
  public CorsConfigurationSource corsConfigurationSource() { // CorsConfigurationSource 설정 객체 반환
    // 다형성 : 부모 타입으로 자식 객체 저장 (구현체 교체 쉬움)
    CorsConfiguration configuration = new CorsConfiguration(); // 실제 CORS 설정값 담는 객체 생성
    // setAllowedOrigins : 허용된 요청만 받음
    configuration.setAllowedOrigins(Arrays.asList( // 리액트 5173 포트 요청 허용
        "http://localhost:5173",
        "http://127.0.0.1:5173"));

    // 허용할 요청들
    // Arrays.asList(...) : 제네릭 (자료형 제한, 문자열만 저장 가능) -> List 배열처럼 여러값 저장
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
    configuration.setExposedHeaders(Arrays.asList("Authorization")); // JWT 응답 헤더 노출
    configuration.setAllowCredentials(true); // 쿠키 허용

    // new CorsConfiguration() : 객체 생성
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(); // 어떤 url에 CORS 적용할지 관리
    source.registerCorsConfiguration("/**", configuration); // 모든 url에 적용
    return source; // 완성된 cors 반환
  }

  // 비밀번호 암호화 객체를 스프링이 관리하게 등록
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

}

/**
 * SecurityFilterChain : 보안 필터들의 실행 순서 체인
 * Filter : Controller 가기 전 중간 검사기
 * 요청 -> cors 검사 -> jwt 검사 -> 권한 검사 -> Controller
 */

/**
 * JWT 필터 역할
 * Authorization 헤더 확인 -> JWT 검증 -> 로그인 사용자 등록
 */

/**
 * 1. 객체지향(OOP) : 자바는 객체중심언어
 * - 객체 : 현실 사물을 코드로 만든 것
 * - 변수는 객체 주소 가르킴
 * - 사용 이유 : 관련 데이터 + 기능 묶기 좋음
 * 
 * 2. enum(이넘) : 고정된 값들 모아놓은 것
 * - 사용 이유: 오타 방지
 * 
 * enum Season {
 * SPRING,
 * SUMMER,
 * FALL,
 * WINTER
 * }
 * => Season = Season.summer;
 * 
 * 3. 람다식 : 함수를 짧게 쓰는 문법
 * - 기본 형태 : 매개변수 -> 실행코드
 * 
 * button.setOnClickListener(new ClickListener() {
 * 
 * @Override
 *           public void click() {
 *           System.out.println("클릭");
 *           }
 *           });
 * 
 *           button.setOnClickListener(() -> {
 *           System.out.println("클릭");
 *           });
 */
/**
 * 4. 의존성 주입(Dependency Injection) : 객체가 다른 객체 필요로 하는 것
 * - 객체 생성 -> 필요 객체 자동 연결 ->주입
 * 
 * class Car {
 * 
 * Engine engine = new Engine(); // 직접 생성하면 결합 강함 -> 교체 어려움
 * }
 * 
 * class Car {
 * 
 * Engine engine;
 * 
 * Car(Engine engine) {
 * this.engine = engine;
 * }
 * }
 * 
 * 
 * @Bean // 객체를 스프링에서 관리해야 의존성주입 가능
 *       public Engine engine() {
 *       return new Engine();
 *       }
 * @Autowired
 *            Engine engine;
 */