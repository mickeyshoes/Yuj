package com.yuj.user.controller;

import com.yuj.response.ResponseService;
import com.yuj.response.SingleResult;
import com.yuj.user.dto.request.TokenRequestDTO;
import com.yuj.user.dto.request.UserLoginRequestDTO;
import com.yuj.user.dto.response.TokenResponseDTO;
import com.yuj.user.dto.response.UserResponseDTO;
import com.yuj.user.service.LoginService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "LogIn / LogOut")
@RequiredArgsConstructor
@RestController
public class LoginController {
    private final LoginService loginService;
    private final ResponseService responseService;

    @ApiOperation(value = "로그인", notes = "id로 로그인합니다.")
    @PostMapping("/login")
    public SingleResult<TokenResponseDTO> login(
            @ApiParam(value = "로그인 요청 DTO", required = true)
            @RequestBody UserLoginRequestDTO userLoginRequestDTO
            ) {
        TokenResponseDTO tokenResponseDTO = loginService.login(userLoginRequestDTO);
        return responseService.getSingleResultSuccess(tokenResponseDTO);
    }

    @ApiOperation(
            value = "액세스, 리프레시 토큰 재발급",
            notes = "액세스 토큰 만료시 회원 검증 후 리프레쉬 토큰을 검증해서 액세스 토큰과 리프레시 토큰을 재발급합니다."
    )
    @PostMapping("/reissue")
    public SingleResult<TokenResponseDTO> reissue(
            @ApiParam(value = "토큰 재발급 요청 DTO", required = true)
            @RequestBody TokenRequestDTO tokenRequestDTO
            ) {
        System.out.println("tokenRequestDTO.getAccessToken() = " + tokenRequestDTO.getAccessToken());
        System.out.println("tokenRequestDTO.getRefreshToken() = " + tokenRequestDTO.getRefreshToken());
        
        return responseService.getSingleResultSuccess(loginService.reissue(tokenRequestDTO));
    }
}
