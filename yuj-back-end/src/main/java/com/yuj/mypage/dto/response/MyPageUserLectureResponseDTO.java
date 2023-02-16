package com.yuj.mypage.dto.response;

import com.yuj.lecture.domain.Lecture;
import com.yuj.lecture.domain.UserLecture;
import com.yuj.lecture.domain.Yoga;
import com.yuj.user.domain.User;
import lombok.*;

import javax.persistence.Column;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MyPageUserLectureResponseDTO {
    //필요한 정보 : thumbnailImage, name 강의 제목,  startTime, day, endDate 강의 시간정보,

//  UserLecture
    private Long userLectureId;
    private LocalDate userRegistDate;
    private boolean state;
//    User
    private Long userId;
    private String id;
    private String nickname;
    private String profileImagePath;
    //    Lecture
    private Long lectureId;
    private String name;
    private String description;
    private String thumbnailImage;
    private LocalDate lectureRegistDate;
    private LocalDate startDate;
    private LocalDate endDate;
    private int limitStudents;
    private int totalCount;
    private boolean isActive;
//    Yoga
    private String englishName;

}
