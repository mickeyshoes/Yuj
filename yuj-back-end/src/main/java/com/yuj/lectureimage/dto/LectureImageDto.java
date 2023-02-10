package com.yuj.lectureimage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LectureImageDto {
    private String origFileName;
    private String filePath;
    private Long fileSize;
}