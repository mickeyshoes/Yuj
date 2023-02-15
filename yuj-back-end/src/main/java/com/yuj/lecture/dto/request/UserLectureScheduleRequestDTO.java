package com.yuj.lecture.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalTime;

@Getter
@Setter
@Builder
@ToString
public class UserLectureScheduleRequestDTO {
    private Long lectureId;
    private Long userId;
}
