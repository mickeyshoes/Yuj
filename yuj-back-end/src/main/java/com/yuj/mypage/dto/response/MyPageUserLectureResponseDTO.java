package com.yuj.mypage.dto.response;

import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MyPageUserLectureResponseDTO {
    //필요한 정보 : thumbnailImage, name 강의 제목,  startTime, day, endDate 강의 시간정보,
    private String name;
    private String thumbnailImage;
    private LocalDate startTime;
    private LocalDate endDate;
    private int day;

}
