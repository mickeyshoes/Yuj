package com.yuj.lecture.dto.response;

import com.yuj.lecture.domain.Yoga;
import com.yuj.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@Builder
public class LectureResponseDTO {
    private Long lectureId;
    private String name;
    private String description;
    private String thumbnailImage;
    private LocalDate registDate;
    private LocalDate startDate;
    private LocalDate endDate;
    private int limitStudents;
    private int fee;
    private int totalCount;
    private  boolean isActive;
    private String username;
    private String nickname;
    private String email;
    private String profileImagePath;
    private Yoga yoga;
}
