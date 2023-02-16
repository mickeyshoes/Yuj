package com.yuj.lecture.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.*;

import org.hibernate.annotations.ColumnDefault;

import com.yuj.user.domain.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class UserLecture {
    @SequenceGenerator(
            name="USER_LECTURE_SEQ_GEN",
            sequenceName = "USER_LECTURE_SEQ",
            initialValue = 100,
            allocationSize = 1
    )
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USER_LECTURE_SEQ_GEN")
    private Long userLectureId;

    private LocalDate registDate;
    @Column(nullable = true)
    private Integer score;
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
