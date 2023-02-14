package com.yuj.lecture.service;

import com.yuj.exception.CLectureNotFoundException;
import com.yuj.exception.CUserNotFoundException;
import com.yuj.lecture.domain.Lecture;
import com.yuj.lecture.domain.UserLecture;
import com.yuj.lecture.repository.LectureRepository;
import com.yuj.lecture.repository.UserLectureRepository;
import com.yuj.user.domain.User;
import com.yuj.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserLectureService {
    private final UserLectureRepository userLectureRepository;
    private final LectureRepository lectureRepository;
    private final UserRepository userRepository;

    @Transactional
    public Long registUserLecture(Long userId, Long lectureId) {
        // 강의, 유저 Entity 찾기
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(CLectureNotFoundException::new);
        User user = userRepository.findById(userId).orElseThrow(CUserNotFoundException::new);

        Long ret = -1L;

        UserLecture userLecture = UserLecture.builder()
                .lecture(lecture)
                .user(user)
                .registDate(LocalDate.now())
                .build();

        ret = userLectureRepository.save(userLecture).getUserLectureId();

        return ret;
    }

    public Long updateUserLectureState(Long userId, Long lectureId) throws Exception {
        Long ret = -1L;
        // 유저렉처 찾아오기
        UserLecture userLecture = userLectureRepository.findByUser_UserIdAndLecture_LectureId(userId, lectureId).orElseThrow(Exception::new);
        // 수정
        userLecture.setState(!userLecture.isState());
        ret = userLecture.getUserLectureId();
        // 수정 후 저장
        userLectureRepository.save(userLecture);
        return ret;
    }
}
