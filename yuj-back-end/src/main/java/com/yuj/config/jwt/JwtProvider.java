package com.yuj.config.jwt;

import com.yuj.exception.CAuthenticationEntryPointException;
import com.yuj.config.security.CustomUserDetailService;
import com.yuj.user.dto.response.TokenResponseDTO;
import io.jsonwebtoken.*;
import io.jsonwebtoken.impl.Base64UrlCodec;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtProvider {
    @Value("spring.jwt.secret")
    private String secretKey;
    private String ROLES = "role";
    private final long ACCESS_TOKEN_VALID_MILLISECOND = 1 * 90 * 1000L;    //  access token 만료 시간 (1분 30초)
    private final long REFRESH_TOKEN_VALID_MILLISECOND = 24 * 60 * 60 * 1000L;  //  refresh token 만료 시간 (하루)

    private final CustomUserDetailService userDetailService;

    @PostConstruct
    protected  void init() {
        secretKey = Base64UrlCodec.BASE64URL.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    //  로그인 시 Jwt 생성
    public TokenResponseDTO createTokenLoginResponseDto(Long userPk, String role) {
        log.info("In createTokenLoginResponseDto");
        log.info("userPk = " + userPk);

        //  User 구분을 위해 Claims에 User pk 및 authorities 목록 삽입
        Claims claims = Jwts.claims().setSubject(String.valueOf(userPk));
        claims.put("role", role);

        //  생성 날짜, 만료 날짜를 위한 Date
        Date now = new Date();

        String accessToken = Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + ACCESS_TOKEN_VALID_MILLISECOND))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        String refreshToken = Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setExpiration(new Date(now.getTime() + REFRESH_TOKEN_VALID_MILLISECOND))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        return TokenResponseDTO.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .accessTokenExpireDate(ACCESS_TOKEN_VALID_MILLISECOND)
                .build();
    }

    //  로그인 시 Jwt 생성
    public TokenResponseDTO createTokenReissueResponseDto(Long userPk, String role, String refreshToken) {
        log.info("In createTokenReissueResponseDto");
        log.info("userPk = " + userPk);

        //  User 구분을 위해 Claims에 User pk 및 authorities 목록 삽입
        Claims claims = Jwts.claims().setSubject(String.valueOf(userPk));
        claims.put("role", role);

        //  생성 날짜, 만료 날짜를 위한 Date
        Date now = new Date();

        String accessToken = Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + ACCESS_TOKEN_VALID_MILLISECOND))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        return TokenResponseDTO.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .accessTokenExpireDate(ACCESS_TOKEN_VALID_MILLISECOND)
                .build();
    }

    //  Jwt로 인증정보를 조회
    public Authentication getAuthentication(String token) {
        //  Jwt에서 claims 추출
        Claims claims = parseClaims(token);

        //  권한 정보가 없음
        if (claims.get(ROLES) == null) {
            throw new CAuthenticationEntryPointException();
        }

        log.info("in getAuthentication()");
        log.info("claims.getSubject() = " + claims.getSubject());
        log.info("claims.getId() = " + claims.getId());

        UserDetails userDetails = userDetailService.loadUserByUserId(claims.getSubject());
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    //  Jwt 토큰 복호화해서 가져오기
    private Claims parseClaims(String token) {
        try {
            return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    //  HTTP Request의 Header에서 Token parsing -> "X-AUTH-TOKEN: jwt"
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("X-AUTH-TOKEN");
    }

    //  JWT의 유효성 및 만료일자 확인
    public boolean validationToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.error("잘못된 Jwt 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.error("만료된 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.error("지원하지 않는 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.error("잘못된 토큰입니다.");
        }

        return false;
    }
}
