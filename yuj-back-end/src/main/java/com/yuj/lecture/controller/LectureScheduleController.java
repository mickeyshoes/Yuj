package com.yuj.lecture.controller;

import com.yuj.lecture.domain.LectureSchedule;
import com.yuj.lecture.service.LectureScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/lectures/lectureSchedule")
@RequiredArgsConstructor
public class LectureScheduleController {

    public final LectureScheduleService lectureScheduleService;

    @GetMapping("/{lectureId}")
    public ResponseEntity<?> getLectureSchedule(@PathVariable long lectureId) {
        List<LectureSchedule> lectureSchedulesByLectureId = lectureScheduleService.getLectureScheduleByLectureId(lectureId);

        if(lectureSchedulesByLectureId != null) {
            return ResponseEntity.ok().body(lectureSchedulesByLectureId);
        } else if(lectureSchedulesByLectureId == null) {
            return ResponseEntity.ok().body("강의 일정 정보가 없습니다.");
        } else {
            return ResponseEntity.badRequest().body("오류가 발생하였습니다.");
        }
    }
}
