package com.yuj.lecture.domain;

import com.yuj.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Lecture {
    @Id
    @Column(name = "lecture_id")
    private Long lectureId;

    @Column(nullable = false, unique = true)
    private String name;
    private String description;
    private String thumbnailImage;

    private LocalDate registDate;
    private LocalDate startDate;
    private LocalDate endDate;
    private int limitStudents;
    private int fee;
    private int totalCount;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "yoga_id")
    private Yoga yoga;

    @PrePersist
    public void registDate() {
        this.registDate = LocalDate.now();
    }
}
