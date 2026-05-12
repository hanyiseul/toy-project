package com.community.login.filter; // 패키지 선언 -> 폴더 구조랑 연결됨

import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.security.authentication.AuthenticationManager; // 로그인 인증 처리 담당
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter; // 스프링 시큐리티 기볼 로그인 필터

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j; // 로그 찍는 객체 자동 생성

/**
 * 인증 필터
 * - /login 앤드포인트로 POST 요청 시, JSON body에서 username/password를 읽어 인증 처리
 * - 인증 성공 시, JWT 토큰을 Authorization 헤더에 담아
 */
@Slf4j
// UsernamePasswordAuthenticationFilter 기능 상속한 JwtAuthenticationFilter 클래스 선언
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter { // 기존 로그인 필터 기능 가져와서 JWT 방식으로 커스터마이징

  // 클래스 내부 변수
  // private : 클래스 내부에서만 사용 가능
  // final : 한 번 값 넣으면 변경 불가
  private final AuthenticationManager authenticationManager; // AuthenticationManager 타입의 AuthenticationManager 변수 -> 객체
                                                             // 저장 변수
  private final JwtProvider jwtProvider;

  // 생성자 (클래스 이름이랑 동일, 객체 생성 시 자동 호출)
  public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtProvider jwtProvider) {
    this.authenticationManager = authenticationManager; // 클래스 내부 변수 = 생성자로 받은 값 : 전달받은 authenticationManager를 클래스 변수에
                                                        // 저장
    this.jwtProvider = jwtProvider;
    // setFilterProcessesUrl(SecurityConstants.LOGIN_URL);
    setFilterProcessesUrl("/login"); // 로그인으로 요청이 올때만 이 필더 실행 (로그인 APi 연결)
  }

  // 인증 시도 : request[ header | body { "username":?, "password":? } ]
  @Override
  public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
      throws AuthenticationException {
    ObjectMapper objectMapper = new ObjectMapper();
    try {
      Users user = objectMapper.readValue(request.getInputStream(), Users.class);
      String username = user.getUsername();
      Str
    }
  }

  // 인증 성공 : response[ header {Authorzation: "Bearer {jwt}" | body {} }]
  @Override
  protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
      Authentication authResult) throws IOException, ServletException {
    // TODO Auto-generated method stub
    super.successfulAuthentication(request, response, chain, authResult);
  }

  // 인증 실패 : status : 401
  @Override
  protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException failed) throws IOException, ServletException {

    log.info("Authentication failed : " + failed.getMessage());
    response.setStatus(401);
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");
    PrintWriter printWriter = response.getWriter();
    printWriter.write("{\"error\":\"UNAUTHORIZED\",\"message\":\"아이디 똔느 비밀번호 불일치\"}");

    printWriter.flush();
  }
}

/**
 * 패키지 선언 : 클래스를 어느 폴더에 둘지 정의
 * import : 다른 클래스 가져오기
 * public : 어디서든 접근 가능
 * private : 자기 클래스 내부만 가능
 * protected : 상속 관계 허용
 * default : 같은 패키지만
 * extends : (상속) 부모 클래스 기능 물려받기
 * 어노테이션 : 코드에 추가 기능 붙이는 문법
 * final : 한번만 값 저장 가능
 * 객체 타입 변수 선언 : 객체 저장 변수 만들기 (AuthenticationManager authenticationManager;) ->
 * 타입 반드시 명시
 * 생성자 : 클래스 이름과 동일, 객체 생성 시 실행 (new ~ 실행)
 * 매개변수 : 외부에서 값 전달 받기
 * this 키워드 : 현재 객체 자신의 변수 접근
 * 
 * 
 */