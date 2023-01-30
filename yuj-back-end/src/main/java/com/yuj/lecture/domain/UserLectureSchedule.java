package com.yuj.lecture.domain;

import com.yuj.user.Users;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserLectureSchedule {
    @Id
    @GeneratedValue
    private Long userLectureScheduleId;
    private LocalDateTime attendanceDate;
    private boolean isAttendance;

    @ManyToOne
    @JoinColumn(name = "users_id")
    private Users users;

    @ManyToOne
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;
}
