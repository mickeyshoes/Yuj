package com.yuj.mypage.dto.response;

import com.yuj.lecture.domain.Lecture;
import com.yuj.user.domain.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class MyPageUserLectureScheduleResponseDTO {
    private Long userLectureScheduleId;
    private LocalDateTime attendanceDate;
    private boolean isAttendance;
    private Long userId;
    private Long lectureId;
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
//
//    @ManyToOne
//    @JoinColumn(name = "lecture_id")
//    private Lecture lecture;
}
