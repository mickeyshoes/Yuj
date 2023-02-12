package com.yuj.advice;

import com.yuj.exception.*;
import com.yuj.response.CommonResult;
import com.yuj.response.ResponseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice
public class ExceptionAdvice {
    private final ResponseService responseService;
    private final MessageSource messageSource;

    /**
     * default Exception
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult defaultException(HttpServletRequest request, Exception e) {
        log.info("알 수 없는 오류 = " + String.valueOf(e));
        return responseService.getFailResult
                (Integer.parseInt(getMessage("unKnown.code")), getMessage("unKnown.msg"));
    }

    /**
     *  유저를 찾지 못했을 때 발생시키는 예외
     */
    @ExceptionHandler(CUserNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult userNotFoundException(HttpServletRequest request, CUserNotFoundException e) {
        log.info("없는 유저 찾기 오류");

        return responseService.getFailResult
                (Integer.parseInt(getMessage("userNotFound.code")), getMessage("userNotFound.msg"));
    }

    /**
     * 유저 이메일 로그인 실패 시 발생시키는 에외
     */
    @ExceptionHandler(CLoginFailedException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult emailLoginFailedException(HttpServletRequest request, CLoginFailedException e) {
        log.info("이메일 로그인 실패 오류");

        return responseService.getFailResult(Integer.parseInt(getMessage("emailLoginFailed.code")),
                getMessage("emailLoginFailed.msg"));
    }

    /**
     * 비밀번호 불일치 시 발생시키는 에외
     */
    @ExceptionHandler(CPasswordNotCorrectException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult passwordNotCorrectException(HttpServletRequest request, CPasswordNotCorrectException e) {
        log.info("비밀번호 불일치 오류");

        return responseService.getFailResult(Integer.parseInt(getMessage("passwordNotCorrect.code")),
                getMessage("passwordNotCorrect.msg"));
    }

    /**
     * 회원 가입 시 이미 로그인된 이메일인 경우 발생시키는 예외
     */
    @ExceptionHandler(CSignUpFailedCException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult SignupFailedException(HttpServletRequest request, CSignUpFailedCException e) {
        log.info("이미 로그인된 로그인 오류");
        return responseService.getFailResult(Integer.parseInt(getMessage("signupFailed.code")), getMessage("signupFailed.msg"));
    }

    /**
     *  전달한 Jwt이 정상적이지 않은 경우 발생시키는 예외
     */
    @ExceptionHandler(CAuthenticationEntryPointException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult authenticationEntrypointException(HttpServletRequest request, CAuthenticationEntryPointException e) {
        log.info("잘못된 토큰 전달 오류");
        return responseService.getFailResult(Integer.parseInt(getMessage("authenticationEntrypoint.code")), getMessage("authenticationEntrypoint.msg"));
    }

    /**
     *  권한이 없는 리소스를 요청한 경우 발생시키는 예외
     */
    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult accessDeniedException(HttpServletRequest request, AccessDeniedException e) {
        log.info("권한이 부족한 오류");
        return responseService.getFailResult(Integer.parseInt(getMessage("accessDenied.code")), getMessage("accessDenied.msg"));
    }

    /**
     *  refresh token 에러시 발생시키는 에러
     */
    @ExceptionHandler(CRefreshTokenException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected  CommonResult refreshTokenException(HttpServletRequest request, CRefreshTokenException e) {
        log.info("refresh token 오류");
        return responseService.getFailResult(Integer.parseInt(getMessage("refreshTokenInValid.code")), getMessage("refreshTokenInValid.msg"));
    }

    /**
     *  액세스 토큰 만료시 발생시키는 에러
     */
    @ExceptionHandler(CExpiredAccessTokenException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected  CommonResult expiredAccessTokenException(HttpServletRequest request, CExpiredAccessTokenException e) {
        log.info("access token 만료 오류");
        return responseService.getFailResult(Integer.parseInt(getMessage("expiredAccessToken.code")), getMessage("expiredAccessToken.msg"));
    }

    private String getMessage(String code) {
        return getMessage(code, null);
    }

    private String getMessage(String code, Object[] args) {
        return messageSource.getMessage(code, args, LocaleContextHolder.getLocale());
    }
}

