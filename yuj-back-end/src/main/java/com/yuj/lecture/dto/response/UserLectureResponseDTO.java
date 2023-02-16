package com.yuj.lecture.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class UserLectureResponseDTO {
    Long userLectureId;
    LocalDate registDate;
    Integer score;
    String review;
    LocalDateTime reviewUpdateDate;
    Long userId;
    Long lectureId;
    boolean state;
}
