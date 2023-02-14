package com.yuj.lecture.domain;

import com.yuj.user.domain.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString(of = {"userLectureId"})
public class UserLecture {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userLectureId;

    private LocalDate registDate;

    @Builder.Default
    @ColumnDefault("0")
    private int score = 0;

    private String review;
    private LocalDateTime reviewUpdateDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;

    @PrePersist
    public void registDate() {
        this.registDate = LocalDate.now();
    }

    @Builder.Default
    @ColumnDefault("1")
    private boolean state = true;
}
