package com.yuj.lecture.controller;

import com.yuj.lecture.service.UserLectureService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lectures/userLectures")
@RequiredArgsConstructor
public class UserLectureController {

    private final UserLectureService userLectureService;

    // 유저 수강 신청
    @PostMapping
    public ResponseEntity<?> registUserLecture(@RequestParam("userId") Long userId, @RequestParam("lectureId") Long lectureId) throws Exception{
        Long ret = userLectureService.registUserLecture(userId, lectureId);
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    // 유저 수강 취소 혹은 재수강
    @PutMapping
    public ResponseEntity<?> updateUserLectureState(@RequestParam("userId") Long userId, @RequestParam("lectureId") Long lectureId) throws Exception {
        Long ret = userLectureService.updateUserLectureState(userId, lectureId);
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }
}
