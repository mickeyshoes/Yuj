package com.yuj.user.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yuj.lecture.dto.request.LectureVO;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.yuj.response.ResponseService;
import com.yuj.response.SingleResult;
import com.yuj.user.dto.request.UserSignupRequestDTO;
import com.yuj.user.dto.request.UserUpdateRequestDTO;
import com.yuj.user.dto.response.UserResponseDTO;
import com.yuj.user.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

//@CrossOrigin(origins = "*")
@Api(tags = {"User"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
@Slf4j
public class UserController {

    private final UserService userService;
    private final ResponseService responseService;

//    @Value("${spring.servlet.multipart.location}")
//    private String savePath;

    
    @GetMapping
    public ResponseEntity<?> searchTeacherByName(@RequestParam("search") String name){
    	List<UserResponseDTO> resultList = userService.searchTeacherByName(name);
    	
    	return new ResponseEntity<>(resultList, HttpStatus.OK);
    }
    
    @ApiOperation(value = "회원가입", notes = "회원가입을 합니다.")
    @PostMapping
    public SingleResult<String> signup(
            @RequestPart(value="files", required = false) List<MultipartFile> files
//            @ApiParam(value = "회원 가입 프로필 이미지", required = false)
//            @RequestPart(value = "file", required = false) MultipartFile files,
            , @ApiParam(value = "회원 가입 요청 DTO", required = true)
            @RequestParam(value = "dto") String userSignupRequestDtoString
    ) {
        log.info("files : " + files);
        log.info("userSignupRequestDtoString : " + userSignupRequestDtoString);

        try {
            JSONParser jsonParser = new JSONParser(userSignupRequestDtoString);
            Object obj = jsonParser.parse();
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> map = mapper.convertValue(obj, Map.class);
            log.info("obj = " + obj);

            for(String key : map.keySet()) {
                log.info(key + " : " + String.valueOf(map.get(key)));
            }
            UserSignupRequestDTO userSignupRequestDTO = UserSignupRequestDTO.builder()
                    .id(String.valueOf(map.get("id")))
                    .password(String.valueOf(map.get("password")))
                    .name(String.valueOf(map.get("name")))
                    .nickname(String.valueOf(map.get("nickname")))
                    .phone(String.valueOf(map.get("phone")))
                    .email(String.valueOf(map.get("email")))
                    .birthDate(LocalDate.parse(String.valueOf(map.get("birthDate")), DateTimeFormatter.ISO_DATE))
                    .gender(String.valueOf(map.get("gender")))
                    .profileImagePath(String.valueOf(map.get("profileImagePath")))
                    .roleName(String.valueOf(map.get("roleName")))
                    .build();
            log.info("userSignupRequestDTO = " + userSignupRequestDTO);

            String id = userService.signUp(files, userSignupRequestDTO);
            return responseService.getSingleResultSuccess("가입한 아이디 : " + id);
        } catch(Exception e) {
            e.printStackTrace();
            return responseService.getSingleResultFail("Fail", -1234, "회원 가입 실패");
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
        log.info("path variable id = {}",id);
        UserResponseDTO userResponseDTO = userService.searchByUserId(id);
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
