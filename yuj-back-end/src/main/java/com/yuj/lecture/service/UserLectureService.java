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

    //유저 렉처 수강 및 재수강
    @Transactional
    public Long registUserLecture(Long userId, Long lectureId) throws Exception {
        // 강의, 유저 Entity 찾기
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(CLectureNotFoundException::new);
        User user = userRepository.findById(userId).orElseThrow(CUserNotFoundException::new);
        UserLecture userLecture = userLectureRepository.findByUser_UserIdAndLecture_LectureId(userId, lectureId).orElseThrow(Exception::new);


        Long ret = -1L;

        // 유저가 수강 혹은 재수강 시 lecture의 현재 total_count++, 만약 그 결과가 limit_students를 넘으면 등록 X.
        if(lecture.getTotalCount() == lecture.getLimitStudents()) return ret;
        // 유저 수강 내역이 존재하는지 아닌지 검사
        if(userLecture != null) {
            if(userLecture.isState()) return ret;
            else {
                //재수강
                ret = updateUserLectureState(userId, lectureId);
                lecture.setTotalCount(lecture.getTotalCount()+1);
                return ret;
            }
        }
        // 유저 수강 내역이 없는 경우
        UserLecture newUserLecture = UserLecture.builder()
                .lecture(lecture)
                .user(user)
                .registDate(LocalDate.now())
                .build();
        lecture.setTotalCount(lecture.getTotalCount()+1);
        ret = userLectureRepository.save(newUserLecture).getUserLectureId();

        return ret;
    }

    // 유저 렉처 상태 변경(수강 취소, 재수강에 이용)
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

    //유저 렉처 검색
    public UserLecture getUserLecture(Long userId, Long lectureId) throws Exception {
        UserLecture userLecture = userLectureRepository.findByUser_UserIdAndLecture_LectureId(userId, lectureId).orElseThrow(Exception::new);
        return userLecture;
    }
}
