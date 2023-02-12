package com.yuj.user.service;

import com.yuj.config.jwt.JwtProvider;
import com.yuj.exception.CPasswordNotCorrectException;
import com.yuj.exception.CRefreshTokenException;
import com.yuj.exception.CUserNotFoundException;
import com.yuj.user.domain.Token;
import com.yuj.user.domain.User;
import com.yuj.user.dto.request.TokenRequestDTO;
import com.yuj.user.dto.request.UserLoginRequestDTO;
import com.yuj.user.dto.response.TokenResponseDTO;
import com.yuj.user.repository.TokenRepository;
import com.yuj.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final TokenRepository tokenRepository;

    /**
     * 
     * @param userLoginRequestDTO : 로그인을 위해 전달해야 하는 정보 (id, password)
     * @return : AccessToken, RefreshToken
     */
    @Transactional
    public TokenResponseDTO login(UserLoginRequestDTO userLoginRequestDTO) {
        log.info("login controller");

        //  id가 존재하는 지 확인
        User user = userRepository.findById(userLoginRequestDTO.getId())
                .orElseThrow(CUserNotFoundException::new);

        log.info("user = " + user);
        log.info("111111111111111111111111111111111111111111111111111111111");
        
        //  password가 일치하는 지 확인
        if(!passwordEncoder.matches(userLoginRequestDTO.getPassword(), user.getPassword()))
            throw new CPasswordNotCorrectException();

        log.info("222222222222222222222222222222222222222222222222222222222222222");
        
        TokenResponseDTO tokenLoginResponseDTO = jwtProvider.createTokenLoginResponseDto(user.getUserId(), user.getRoleName());
        
        try {
            Token updatedToken = tokenRepository.findByUserId(user.getUserId()).orElseThrow(CUserNotFoundException::new);
            updatedToken.setRefreshToken(tokenLoginResponseDTO.getRefreshToken());
        } catch(CUserNotFoundException e) {
            Token refreshToken = Token.builder()
                    .refreshToken(tokenLoginResponseDTO.getRefreshToken())
                    .userId(user.getUserId())
                    .build();
            tokenRepository.save(refreshToken);
        }

        return tokenLoginResponseDTO;
    }

    @Transactional
    public TokenResponseDTO reissue(TokenRequestDTO tokenRequestDTO) {
        log.info("reissue service");
        //  Refresh Token이 만료되었을 경우
        if(!jwtProvider.validationToken(tokenRequestDTO.getRefreshToken()))
            throw new CRefreshTokenException();

        //  Access Token에서 username PK 가져오기
        String accessToken = tokenRequestDTO.getAccessToken();
        Authentication authentication = jwtProvider.getAuthentication(accessToken);
        log.info("authentication.getName() = " + authentication.getName());

        //  user pk로 유저 검색 / repo에 저장된 Refresh Token이 없음
        User user = userRepository.findById(Long.parseLong(authentication.getName()))
                .orElseThrow(CUserNotFoundException::new);

        log.info("******************** 1 ********************");
        log.info("&&&&&&&&&&&&&&&& user.getUserId() = " + user.getUserId() + "&&&&&&&&&&&&&&&&");
        Token token = tokenRepository.findByUserId(user.getUserId())
                .orElseThrow(CRefreshTokenException::new);
        log.info("******************** 2 ********************");
        //  Refresh Token이 불일치할 경우
        if(!token.getRefreshToken().equals(tokenRequestDTO.getRefreshToken()))
            throw new CRefreshTokenException();
        log.info("******************** 3 ********************");

//        //  Access Token, Refresh Token 재발급, Refresh Token 저장
//        TokenResponseDTO newCreatedToken = jwtProvider.createTokenLoginResponseDto(user.getId(), user.getRoles());
        //  Access Token 재발급
//        TokenResponseDTO reissuedToken = jwtProvider.createTokenReissueResponseDto(user.getId(), user.getRoles(), tokenRequestDTO.getRefreshToken());
        TokenResponseDTO reissuedToken = jwtProvider.createTokenReissueResponseDto(user.getUserId(), user.getRoleName(), tokenRequestDTO.getRefreshToken());

        log.info("******************** 4 ********************");
//        Token updatedToken = token.updateRefreshToken(newCreatedToken.getRefreshToken());
        log.info("******************** 5 ********************");
//        tokenRepository.save(updatedToken);
        log.info("******************** 6 ********************");

//        return newCreatedToken;
        return reissuedToken;
    }
}
