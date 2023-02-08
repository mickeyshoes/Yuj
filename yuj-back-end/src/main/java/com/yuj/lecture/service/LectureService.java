package com.yuj.lecture.service;

import com.yuj.lecture.dto.response.LectureResponseDTO;

import java.util.List;

public interface LectureService {
    LectureResponseDTO getLectureById(Long lectureId) throws Exception;
    List<LectureResponseDTO> getLecturesByUserId(Long userId) throws Exception;
}
