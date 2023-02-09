package com.yuj.config.security;

import com.yuj.config.jwt.JwtAuthenticationFilter;
import com.yuj.config.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsUtils;

@RequiredArgsConstructor
@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    private final JwtProvider jwtProvider;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;
    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues()); //  CORS 해결을 위해 추가

        http.httpBasic().disable()
                .csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/login").permitAll()             //   로그인은 토큰 없이 가능
                .antMatchers(HttpMethod.POST, "/users").permitAll()             //   회원가입은 토큰 없이 가능
                .antMatchers(HttpMethod.POST, "/reissue").permitAll()            //   회원가입은 토큰 없이 가능
                .antMatchers(HttpMethod.POST, "/openvidu/**").permitAll()          //  토큰 재발행은 토큰 없이 가능
                .antMatchers(HttpMethod.GET, "/studio/**").permitAll()
                .antMatchers("/lectures/**").permitAll()
                .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()                     // CORS 해결을 위해 추가
//                .antMatchers("https://i8a504.p.ssafy.io/**").permitAll()
//                .antMatchers(OPENVIDU_URL + "**").permitAll()
//                .antMatchers(HttpMethod.GET, "/users/{id}").permitAll()                  //  회원 정보 조회는 토큰 있어야 가능    
//                .antMatchers(HttpMethod.PUT, "/users/{id}").permitAll()                  //  회원 정보 수정은 토큰 있어야 가능
                .antMatchers(HttpMethod.GET, "/exception/**").permitAll()
                .anyRequest().hasAnyRole("USER", "TEACHER")
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(customAuthenticationEntryPoint)
                .accessDeniedHandler(customAccessDeniedHandler)
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers("/v2/api-docs", "/swagger-resources/**", "/swagger-ui.html", "/webjars/**", "/swagger/**");

    }

}
