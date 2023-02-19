package com.yuj.lecture.controller;

import com.yuj.lecture.dto.request.LectureReviewRequestDTO;
import com.yuj.lecture.dto.response.LectureReviewResponseDTO;
import com.yuj.lecture.dto.response.UserLectureResponseDTO;
import com.yuj.lecture.service.LectureService;
import com.yuj.lecture.service.UserLectureService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lectures/userLectures")
@RequiredArgsConstructor
@Slf4j
public class UserLectureController {

    private final UserLectureService userLectureService;
    private final LectureService lectureService;

    // 유저 수강 검색
    @GetMapping
    public ResponseEntity<?> searchUserLecture(@RequestParam("userId") Long userId, @RequestParam("lectureId") Long lectureId) throws Exception {
        UserLectureResponseDTO userLectureResponseDTO = userLectureService.getUserLecture(userId, lectureId);
        return new ResponseEntity<>(userLectureResponseDTO, HttpStatus.OK);
    }

    // 유저 수강 신청 혹은 재수강
    @PostMapping
    public ResponseEntity<?> registUserLecture(@RequestParam("userId") Long userId, @RequestParam("lectureId") Long lectureId) throws Exception{
        log.info("In registUserLecture");
        log.info("userId = " + userId);
        log.info("lectureId = " + lectureId);
        Long ret = -1L;
        ret = userLectureService.registUserLecture(userId, lectureId);
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    // 유저 수강 취소
    @PostMapping("/delete")
    public ResponseEntity<?> deleteUserLecture(@RequestParam("userId") Long userId, @RequestParam("lectureId") Long lectureId) throws Exception {
        Long ret = userLectureService.deleteUserLecture(userId, lectureId);
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }
    
    // 수강 후기 관련 api
    
    // 유저(강사의) 수강후기 리스트
    @GetMapping("/review")
    public ResponseEntity<?> getReviewByUserId(@RequestParam("userId") long userId) {
        List<LectureReviewResponseDTO> resultList = userLectureService.getReviewsByUserId(userId);
        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }

    // 유저 수강후기 등록
    @PostMapping("/review")
    public ResponseEntity<?> registReview(@RequestBody LectureReviewRequestDTO userRequestDto) throws Exception {
        try {
        	userLectureService.registReview(userRequestDto);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    // 유저 수강후기 삭제
    @GetMapping("/review/{userLectureId}")
    public ResponseEntity<?> deleteReview(@PathVariable long userLectureId) throws Exception {
    	try {
    		userLectureService.deleteReview(userLectureId);
    		return new ResponseEntity<>(HttpStatus.OK);
    	} catch (Exception e) {
    		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
    }
    
    // 유저 수강후기 수정
}
