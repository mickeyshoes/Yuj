package com.yuj.lecture.dto.request;

import com.yuj.lecture.domain.Lecture;
import com.yuj.lecture.domain.LectureSchedule;
import lombok.*;

import java.time.LocalTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class LectureScheduleRegistDto {
    LocalTime startTime;
    LocalTime endTime;
    int day;

    public LectureSchedule toEntity(Lecture lecture) {
        return LectureSchedule.builder()
                .startTime(startTime)
                .endTime(endTime)
                .day(day)
                .lecture(lecture)
                .build();
    }
}
