package com.yuj.lecture.domain;

import com.yuj.user.domain.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class UserLectureSchedule {
    @SequenceGenerator(
            name="USER_LECTURE_SCHEDULE_SEQ_GEN",
            sequenceName = "USER_LECTURE_SCHEDULE_SEQ",
            initialValue = 100,
            allocationSize = 1
    )

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USER_LECTURE_SCHEDULE_SEQ_GEN")
    private Long userLectureScheduleId;
    private LocalDateTime attendanceDate;
    private boolean isAttendance;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;
}
