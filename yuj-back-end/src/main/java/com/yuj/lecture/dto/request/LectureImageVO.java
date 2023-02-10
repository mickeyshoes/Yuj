package com.yuj.lecture.dto.request;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

/**
 * 강의와 강사 아이디, 강의 정보, 강좌 썸네일
 */

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LectureImageVO {
    private String userId;      //  강사 아이디(PK를 받을 지 고민 중)
    private String name;        //  강의 제목
    private String description; //  강의 상세 정보
    private LocalDate registDate;
    private LocalDate startDate;
    private LocalDate endDate;
    private int limitStudents;
    private int fee;
    private int totalCount;         //  단순 정보들
    
    private List<MultipartFile> files;  //  이미지 파일 정보 저장
}
