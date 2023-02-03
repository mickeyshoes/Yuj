package com.yuj.user.controller;

import com.yuj.response.ResponseService;
import com.yuj.response.SingleResult;
import com.yuj.user.dto.request.UserSignupRequestDTO;
import com.yuj.user.dto.request.UserUpdateRequestDTO;
import com.yuj.user.dto.response.UserResponseDTO;
import com.yuj.user.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Api(tags = {"User"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final ResponseService responseService;
    @ApiOperation(value = "회원가입", notes = "회원가입을 합니다.")
    @PostMapping
    public SingleResult<HttpStatus> signup(
            @ApiParam(value = "회원 가입 요청 DTO", required = true)
            @RequestBody UserSignupRequestDTO userSignupRequestDto) {

        boolean success = userService.signUp(userSignupRequestDto);
        HttpStatus ret = success ? HttpStatus.ACCEPTED : HttpStatus.CONFLICT;
//        return responseService.getSingleResult(ret);

        if(success) {
            return responseService.getSingleResultSuccess(ret);
        }
        else {
            return responseService.getSingleResultFail(ret, ret.value(), ret.getReasonPhrase());
        }
    }

    @ApiOperation(value = "회원 정보 조회", notes = "id로 회원정보를 가져옵니다.")
    @GetMapping("/{id}")
    public SingleResult<UserResponseDTO> searchById(
            @ApiParam(value = "회원 id", required = true)
            @PathVariable("id")String id) {
        UserResponseDTO userResponseDTO = userService.searchById(id);
        return responseService.getSingleResultSuccess(userResponseDTO);
    }

    @ApiOperation(value = "회원 정보 수정", notes = "id에 해당하는 회원정보를 수정합니다.")
    @PutMapping("/{id}")
    public SingleResult<HttpStatus> updateUser(
            @ApiParam(value = "회원 id", required = true)
            @PathVariable("id")String id,
            @ApiParam(value = "회원 정보 수정 요청 DTO", required = true)
            @RequestBody UserUpdateRequestDTO userUpdateRequestDTO) {

        boolean success = userService.updateUser(id, userUpdateRequestDTO);
        HttpStatus ret = success ? HttpStatus.ACCEPTED : HttpStatus.CONFLICT;
        if(success) {
            return responseService.getSingleResultSuccess(ret);
        }
        else {
            return responseService.getSingleResultFail(ret, ret.value(), ret.getReasonPhrase());
        }
    }
}
