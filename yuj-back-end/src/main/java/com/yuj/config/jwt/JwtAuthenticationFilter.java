package com.yuj.config.jwt;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.security.core.Authentication;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Slf4j
public class JwtAuthenticationFilter extends GenericFilterBean {
    private final JwtProvider jwtProvider;

    public JwtAuthenticationFilter(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    //  request로 들어오는 Jwt의 유효성을 검증
    //  JwtProvider.validationToken()을 필터로서 FilterChain에 추가
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("JWT doFilter");
        //  request에서 token을 취한다.
        String token = jwtProvider.resolveToken((HttpServletRequest)request);
        System.out.println("token = " + token);
        System.out.println("URL = " + ((HttpServletRequest)request).getRequestURL());
        
        //  검증
        log.info("[Verifying token]");
        log.info(((HttpServletRequest)request).getRequestURL().toString());

        if(token != null && jwtProvider.validationToken(token)) {
            Authentication authentication = jwtProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            System.out.println("authentication.getName() = " + authentication.getName());
//            request.setAttribute("id", authentication.getName());
            System.out.println("에헴!!!!!!!!!");
        }
        filterChain.doFilter(request, response);
    }
}
