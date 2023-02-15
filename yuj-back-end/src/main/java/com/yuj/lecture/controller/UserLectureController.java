package com.yuj.lecture.controller;

import com.yuj.lecture.domain.UserLecture;
import com.yuj.lecture.service.LectureService;
import com.yuj.lecture.service.UserLectureService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
        UserLecture userLecture = userLectureService.getUserLecture(userId, lectureId);
        return new ResponseEntity<>(userLecture, HttpStatus.OK);
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
    @PutMapping
    public ResponseEntity<?> deleteUserLecture(@RequestParam("userId") Long userId, @RequestParam("lectureId") Long lectureId) throws Exception {
        Long ret = userLectureService.deleteUserLecture(userId, lectureId);
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }
}
