package com.yuj.lecture.service;

import com.yuj.lecture.domain.Lecture;
import com.yuj.lecture.domain.LectureSchedule;
import com.yuj.lecture.dto.response.LectureScheduleResponseDTO;
import com.yuj.lecture.repository.LectureScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LectureScheduleService {

    private final LectureScheduleRepository lectureScheduleRepository;

    // 강의별 스케줄 반환
    public List<LectureScheduleResponseDTO> getLectureScheduleByLectureId(long lectureId){
        List<LectureSchedule> LectureScheduleList = lectureScheduleRepository.findAllByLecture_LectureId(lectureId);

        List<LectureScheduleResponseDTO> returnList = new ArrayList<>();

        for(LectureSchedule lectureSchedule: LectureScheduleList) {
            returnList.add(entityToResponseDTO(lectureSchedule));
        }

        return returnList;
    }

    private LectureScheduleResponseDTO entityToResponseDTO(LectureSchedule lectureSchedule) {
//        Lecture lecture = lectureSchedule.getLecture();
        return LectureScheduleResponseDTO.builder()
                .scheduleId(lectureSchedule.getScheduleId())
                .startTime(lectureSchedule.getStartTime())
                .endTime(lectureSchedule.getEndTime())
                .day(lectureSchedule.getDay())
//                .lecture(lectureSchedule.getLecture())
                .build();
    }
}
