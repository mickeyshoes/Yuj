package com.yuj.lecture.service;

import com.yuj.lecture.domain.Lecture;
import com.yuj.lecture.domain.LectureSchedule;
import com.yuj.lecture.dto.response.LectureScheduleResponseDTO;
import com.yuj.lecture.repository.LectureScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LectureScheduleService {

    private final LectureScheduleRepository lectureScheduleRepository;

    // 강의별 스케줄 반환
    public List<LectureSchedule> getLectureScheduleByLectureId(long lectureId){
        return lectureScheduleRepository.findAllByLecture_LectureId(lectureId);
    }

    private LectureScheduleResponseDTO entityToResponseDTO(LectureSchedule lectureSchedule) {
        Lecture lecture = lectureSchedule.getLecture();
        return LectureScheduleResponseDTO.builder()
                .scheduleId(lectureSchedule.getScheduleId())
                .startTime(lectureSchedule.getStartTime())
                .endTime(lectureSchedule.getEndTime())
                .day(lectureSchedule.getDay())
                .lecture(lectureSchedule.getLecture())
                .build();
    }
}
