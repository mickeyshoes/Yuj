package com.yuj.mypage.dto.response;

import lombok.*;

import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyPageLectureScheduleResponseDTO {
    //lectureId로 lectureSchedule조회

    //lectureSchedule
    private Long scheduleId;
    private LocalTime startTime;
    private LocalTime endTime;
    private int day;

    //lecture
    private Long lectureId;

}
