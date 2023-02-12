package com.yuj.lecture.dto.request;

import lombok.*;

import java.time.LocalDate;

/**
 * 강의와 강사 아이디, 강의 정보, 강좌 썸네일
 */

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class LectureVO {
    private Long userId;      //  강사 아이디(PK)

    private Long yogaId;    //  요가 PK
    private String name;        //  강의 제목
    private String description; //  강의 상세 정보
    private LocalDate registDate;
    private LocalDate startDate;
    private LocalDate endDate;
    private int limitStudents;
    private int fee;
    private int totalCount;         //  단순 정보들

//    List<MultipartFile> files;  //  이미지 파일 정보 저장
}
