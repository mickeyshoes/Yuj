package com.yuj.lecture.service;

import com.yuj.lecture.domain.Lecture;
import com.yuj.lecture.dto.response.LectureResponseDTO;
import com.yuj.lecture.repository.LectureRepository;
import com.yuj.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LectureServiceImpl implements LectureService {

    private final LectureRepository lectureRepository;

    @Override
    public LectureResponseDTO getLectureById(Long lectureId) throws Exception {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(() -> new Exception("수업이 존재하지 않습니다."));

        return entityToResponseDTO(lecture);
    }

    @Override
    public List<LectureResponseDTO> getLecturesByUserId(Long userId) throws Exception {
        List<Lecture> list = lectureRepository.findByUser_UserId(userId).orElseThrow(() -> new Exception("수업이 존재하지 않습니다."));
        List<LectureResponseDTO> returnList = new ArrayList<>();

        for(Lecture lecture : list) {
            returnList.add(entityToResponseDTO(lecture));
        }

        return returnList;
    }

    private LectureResponseDTO entityToResponseDTO(Lecture lecture) {
        User user = lecture.getUser();
        return LectureResponseDTO.builder()
                .fee(lecture.getFee())
                .lectureId(lecture.getLectureId())
                .description(lecture.getDescription())
                .endDate(lecture.getEndDate())
                .limitStudents(lecture.getLimitStudents())
                .name(lecture.getName())
                .registDate(lecture.getRegistDate())
                .startDate(lecture.getStartDate())
                .thumbnailImage(lecture.getThumbnailImage())
                .totalCount(lecture.getTotalCount())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .profileImagePath(user.getProfileImagePath())
                .yoga(lecture.getYoga())
                .build();
    }
}
