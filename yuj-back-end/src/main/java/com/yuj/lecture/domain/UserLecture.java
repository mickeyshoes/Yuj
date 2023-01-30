package com.yuj.lecture.domain;

import com.yuj.user.Users;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserLecture {
    @Id
    @GeneratedValue
    private Long userLectureId;

    private LocalDate registDate;
    private int score;
    private String review;
    private LocalDateTime reviewUpdateDate;

    @ManyToOne
    @JoinColumn(name = "users_id")
    private Users users;

    @ManyToOne
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;

    @PrePersist
    public void registDate() {
        this.registDate = LocalDate.now();
    }
}
