package com.yuj.lecture.controller;

import com.yuj.lecture.domain.LectureSchedule;
import com.yuj.lecture.dto.response.LectureResponseDTO;
import com.yuj.lecture.dto.response.LectureScheduleResponseDTO;
import com.yuj.lecture.service.LectureScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/lectures/lectureSchedule")
@RequiredArgsConstructor
public class LectureScheduleController {

    private final LectureScheduleService lectureScheduleService;

    @GetMapping("/{lectureId}")
    public ResponseEntity<List<LectureScheduleResponseDTO>> getLectureScheduleByLectureId(@PathVariable long lectureId) {
        log.info("getLectureScheduleByLectureId controller");
        log.info("LectureId : {}", lectureId);

        List<LectureScheduleResponseDTO> lectureScheduleResponseDTOList = lectureScheduleService.getLectureScheduleByLectureId(lectureId);

        return ResponseEntity.status(HttpStatus.OK).body(lectureScheduleResponseDTOList);
    }
}
