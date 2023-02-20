package com.yuj.lecture.service;

import com.yuj.exception.CLectureScheduleNotFoundException;
import com.yuj.lecture.domain.Lecture;
import com.yuj.lecture.domain.LectureSchedule;
import com.yuj.lecture.dto.response.LectureScheduleResponseDTO;
import com.yuj.lecture.repository.LectureScheduleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class LectureScheduleService {

    private final LectureScheduleRepository lectureScheduleRepository;

    // 강의별 스케줄 반환
    public List<LectureScheduleResponseDTO> getLectureScheduleByLectureId(long lectureId){
        List<LectureSchedule> LectureScheduleList = lectureScheduleRepository.findAllByLecture_LectureId(lectureId).orElseThrow(CLectureScheduleNotFoundException::new);

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

    /**
     * 
     * @param lectureId : 삭제할 강의 PK
     * @return : 강의가 삭제되면서 삭제될 강의 일정 개수
     */
    @Transactional
    public int deleteLectureScheduleByLectureId(Long lectureId) {
        int ret = 0;

        try {
            List<LectureSchedule> lectureScheduleList = lectureScheduleRepository.findAllByLecture_LectureId(lectureId).orElseThrow(CLectureScheduleNotFoundException::new);
            ret = lectureScheduleList.size();

            for(LectureSchedule lectureSchedule: lectureScheduleList)
                lectureScheduleRepository.delete(lectureSchedule);
        } catch(CLectureScheduleNotFoundException e) {
            e.printStackTrace();
        } finally {
            return ret;
        }
    }
}
