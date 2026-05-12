package com.community.login.filter;

import java.io.IOException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor // final 필수 매개 변수 생성자
public class JwtRequestFilter extends OncePerRequestFilter {

  private final AuthenticationManager authenticationManager;
  private final JwtProvider jwtProvider; // jwtProvider 의존성 주입

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    String authorization = request.getHeader (SecurityConstants.TOKEN_HEADER);
    log.info("authorization: " + authorization);

    // authorization가 아래 해당이 하나라도 있으면 넘어감
    if(authorization == null  authorization.length() == 0 || !authorization.startsWith(SecurityConstants.TOKEN_HEADER)) {
      filterChain.doFilter(request, response); // 다음 필터 호출하고 넘어감
      return;
    }

    
  }

  // 생성자 주입
  // public JwtRequestFilter(AuthenticationManager authenticationManager) {
  // this.authenticationManager = authenticationManager;
  // this.jwtProvider = jwtProvider;
  // }

}