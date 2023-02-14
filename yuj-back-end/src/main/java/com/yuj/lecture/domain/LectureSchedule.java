package com.yuj.lecture.domain;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class LectureSchedule {
    @SequenceGenerator(
            name="LECTURE_SCHEDULE_SEQ_GEN",
            sequenceName = "LECTURE_SCHEDULE_SEQ",
            initialValue = 100,
            allocationSize = 1
    )

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "LECTURE_SCHEDULE_SEQ_GEN")
    @Column(name = "schedule_id")
    private Long scheduleId;

    @Column(nullable = false)
    private LocalTime startTime;
    @Column(nullable = false)
    private LocalTime endTime;
    @Column(nullable = false)
    private int day;

    @ManyToOne
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;
}
