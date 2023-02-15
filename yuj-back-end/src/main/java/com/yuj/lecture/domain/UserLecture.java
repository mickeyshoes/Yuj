package com.yuj.lecture.domain;

import com.yuj.user.domain.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
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
