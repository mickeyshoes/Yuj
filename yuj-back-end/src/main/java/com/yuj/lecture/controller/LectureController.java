package com.yuj.lecture.controller;

import com.yuj.lecture.dto.request.LectureImageVO;
import com.yuj.lecture.dto.request.LectureUpdateActiveRequestDTO;
import com.yuj.lecture.dto.response.LectureResponseDTO;
import com.yuj.lecture.service.LectureService;
import com.yuj.lectureimage.handler.FileHandler;
import com.yuj.lectureimage.service.LectureImageService;
import com.yuj.response.ListResult;
import com.yuj.response.ResponseService;

import com.yuj.user.domain.User;
import com.yuj.user.dto.response.UserResponseDTO;
import com.yuj.user.service.UserService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lectures")
@RequiredArgsConstructor
public class LectureController {

    private final LectureService lectureService;
    private final UserService userService;
    private final LectureImageService lectureImageService;

    private final FileHandler fileHandler;

//    @PostMapping
//    public ResponseEntity<?> registLecture(LectureImageVO lectureImageVO) {
//        //  강사 아이디로 강사 찾아내기
//        UserResponseDTO userResponseDTO = userService.searchById(lectureImageVO.getUserId());
//    }

    @GetMapping
    public ResponseEntity<?> searchLectureByName(@RequestParam("search") String name) throws Exception{
    	List<LectureResponseDTO> resultList = lectureService.searchLectureByName(name);
    	
    	return new ResponseEntity<>(resultList, HttpStatus.OK);
    }
    
    @GetMapping("/{lectureId}")
    public ResponseEntity<LectureResponseDTO> getLectureById(@PathVariable long lectureId) throws Exception {
        LectureResponseDTO lectureResponseDTO = lectureService.getLectureById(lectureId);

        return ResponseEntity.status(HttpStatus.OK).body(lectureResponseDTO);
    }

    @PostMapping("/{lectureId}/updateActive")
    public ResponseEntity<LectureResponseDTO> updateLectureActive(@PathVariable long lectureId, @RequestBody LectureUpdateActiveRequestDTO lectureRequestDTO) throws Exception {

        //토큰 userID와 DTO userID 같은지 검증 추가


        LectureResponseDTO lectureResponseDTO = lectureService.updateLectureActive(lectureId, lectureRequestDTO.getUserId(), lectureRequestDTO.isActive());

        return ResponseEntity.status(HttpStatus.OK).body(lectureResponseDTO);
    }
}
