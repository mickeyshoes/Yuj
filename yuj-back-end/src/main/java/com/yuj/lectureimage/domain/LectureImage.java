package com.yuj.lectureimage.domain;

import com.yuj.lecture.domain.Lecture;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "lecture_image")
public class LectureImage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "lecture_image_id")
    private Long lectureImageId;

    @Column(nullable = false)
    private String origFileName;    //  파일 원본명

    @Column(nullable = false)
    private String filePath;        //  파일 저장 경로

    private Long fileSize;          //  파일 크기

    @ManyToOne
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;

    //  lecture 정보 저장
    public void setLecture(Lecture lecture) {
        this.lecture = lecture;
        System.out.println("In setLecture");
        System.out.println("lecture = " + lecture);

        System.out.println("lecture = " + lecture);

        //  lecture에 현재 이미지 파일이 존재하지 않는다면
        if(!lecture.getLectureImages().contains(this)) {
            //  파일 추가
            lecture.getLectureImages().add(this);
        }
    }

    @Builder
    public LectureImage(String origFileName, String filePath, Long fileSize) {
        this.origFileName = origFileName;
        this.filePath = filePath;
        this.fileSize = fileSize;
    }
}
