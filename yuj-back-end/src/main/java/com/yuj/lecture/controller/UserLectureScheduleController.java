package com.yuj.lecture.controller;

import com.yuj.lecture.domain.Lecture;
import com.yuj.lecture.dto.request.UserLectureScheduleRequestDTO;
import com.yuj.lecture.dto.response.LectureScheduleResponseDTO;
import com.yuj.lecture.dto.response.UserLectureScheduleResponseDTO;
import com.yuj.lecture.service.LectureScheduleService;
import com.yuj.lecture.service.UserLectureScheduleService;
import com.yuj.user.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/lectures/userLectureSchedule")
@RequiredArgsConstructor
public class UserLectureScheduleController {

    private final UserLectureScheduleService userLectureScheduleService;

    @PostMapping("")
    public ResponseEntity<?> registUserLectureSchedule(@RequestBody UserLectureScheduleRequestDTO requestDTO) throws Exception {
        log.info("registUserLectureSchedule controller");
        log.info("requestDTO : {}", requestDTO);

        Long userId = requestDTO.getUserId();
        Long lectureId = requestDTO.getLectureId();

        UserLectureScheduleResponseDTO responseDTO = userLectureScheduleService.saveUserLectureSchedule(userId, lectureId);

        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }
}
