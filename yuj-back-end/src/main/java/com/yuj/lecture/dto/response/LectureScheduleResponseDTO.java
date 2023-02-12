package com.yuj.lecture.dto.response;

import com.yuj.lecture.domain.Lecture;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
@Builder
public class LectureScheduleResponseDTO {
    private Long scheduleId;
    private LocalTime startTime;
    private LocalTime endTime;
    private int day;
//    private Lecture lecture;
}
