package com.yuj.lecture.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@Builder
public class UserLectureScheduleResponseDTO {
    private Long userLectureScheduleId;
    private LocalDateTime attendanceDate;
    private Boolean attendance;
    private Long lectureId;
    private Long userId;
}
