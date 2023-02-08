package com.yuj.user.controller;

import com.yuj.response.ResponseService;
import com.yuj.response.SingleResult;
import com.yuj.user.dto.request.UserSignupRequestDTO;
import com.yuj.user.dto.request.UserUpdateRequestDTO;
import com.yuj.user.dto.response.UserResponseDTO;
import com.yuj.user.service.UserService;
import com.yuj.util.MD5Generator;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.Map;

@CrossOrigin(origins = "*")
@Api(tags = {"User"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final ResponseService responseService;

//    @Value("${spring.servlet.multipart.location}")
//    private String savePath;

    @ApiOperation(value = "회원가입", notes = "회원가입을 합니다.")
    @PostMapping
    public SingleResult<HttpStatus> signup(
//            @ApiParam(value = "회원 가입 프로필 이미지", required = false)
//            @RequestPart(value = "file", required = false) MultipartFile files,
            @ApiParam(value = "회원 가입 요청 DTO", required = true)
            @RequestBody UserSignupRequestDTO userSignupRequestDto) {

//        try {
//            String origFileName = files.getOriginalFilename();
//            System.out.println("origFileName = " + origFileName);
//            String fileName = new MD5Generator(origFileName).toString();
//            System.out.println("fileName = " + fileName);
//
//            /* 파일이 저장되는 폴더가 없으면 폴더를 생성합니다. */
//            if(!new File(savePath).exists()) {
//                try {
//                    new File(savePath).mkdir();
//                } catch (Exception e) {
//                    e.getStackTrace();
//                }
//            }
//
//            String filePath = savePath + "\\" + fileName + ".jpg";
//            files.transferTo(new File(filePath));
//            userSignupRequestDto.setProfileImagePath(filePath);
//        } catch(Exception e) {
//            e.printStackTrace();
//        }

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

    @ApiImplicitParams({
            @ApiImplicitParam(
                    name = "X-AUTH-TOKEN",
                    value = "로그인 성공 후 AccessToken",
                    required = true, dataType = "String", paramType = "header"
            ),
    })
    @ApiOperation(value = "회원 정보 조회", notes = "id로 회원정보를 가져옵니다.")
    @GetMapping("/{id}")
    public SingleResult<UserResponseDTO> searchById(
            @ApiParam(value = "회원 id", required = true)
            @PathVariable("id")String id
            ) {
//        System.out.println("In searchById");
//        String accessToken = request.getParameter("X-AUTH-TOKEN");
//        System.out.println("accessToken = " + accessToken);
        
        UserResponseDTO userResponseDTO = userService.searchById(id);
        return responseService.getSingleResultSuccess(userResponseDTO);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(
                    name = "X-AUTH-TOKEN",
                    value = "로그인 성공 후 AccessToken",
                    required = true, dataType = "String", paramType = "header"
            )
    })
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
