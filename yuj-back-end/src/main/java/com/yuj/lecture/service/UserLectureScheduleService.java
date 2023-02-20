package com.yuj.lecture.service;

import com.yuj.exception.CUserLectureScheduleNotFoundException;
import com.yuj.lecture.domain.Lecture;
import com.yuj.lecture.domain.LectureSchedule;
import com.yuj.lecture.domain.UserLectureSchedule;
import com.yuj.lecture.dto.request.UserLectureScheduleRequestDTO;
import com.yuj.lecture.dto.response.LectureScheduleResponseDTO;
import com.yuj.lecture.dto.response.UserLectureScheduleResponseDTO;
import com.yuj.lecture.repository.LectureRepository;
import com.yuj.lecture.repository.LectureScheduleRepository;
import com.yuj.lecture.repository.UserLectureScheduleRepository;
import com.yuj.user.domain.User;
import com.yuj.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserLectureScheduleService {

    private final UserLectureScheduleRepository userLectureScheduleRepository;
    private final UserRepository userRepository;
    private final LectureRepository lectureRepository;

    public UserLectureScheduleResponseDTO saveUserLectureSchedule(Long userId, Long LectureId) throws Exception {
        Optional<List<UserLectureSchedule>> schedules = userLectureScheduleRepository.findByUser_UserIdAndLecture_LectureId(userId, LectureId);
        if(schedules.isPresent()) {
            LocalDate nowLocalDate = LocalDate.now();
            for(UserLectureSchedule schedule : schedules.get()) {
                if(schedule.getAttendanceDate().toLocalDate().isEqual(nowLocalDate)){
                    return null;
                }
            }
        }

        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("해당 유저가 존재하지 않습니다."));
        Lecture lecture = lectureRepository.findById(LectureId).orElseThrow(() -> new Exception("해당 강의가 존재하지 않습니다."));

        UserLectureSchedule userLectureSchedule = UserLectureSchedule.builder()
                .attendanceDate(LocalDateTime.now())
                .isAttendance(true)
                .user(user)
                .lecture(lecture)
                .build();

        return entityToResponseDTO(userLectureScheduleRepository.save(userLectureSchedule));
    }

    private UserLectureScheduleResponseDTO entityToResponseDTO(UserLectureSchedule userLectureSchedule) {
        return UserLectureScheduleResponseDTO.builder()
                .userLectureScheduleId(userLectureSchedule.getUserLectureScheduleId())
                .attendance(userLectureSchedule.isAttendance())
                .attendanceDate(userLectureSchedule.getAttendanceDate())
                .lectureId(userLectureSchedule.getLecture().getLectureId())
                .userId(userLectureSchedule.getUser().getUserId())
                .build();
    }

    /**
     *
     * @param lectureId : 삭제할 강의 pk
     * @return : 강의가 삭제되면서 삭제될 수강 내역 개수
     */
    public int deleteUserLectureScheduleByLectureId(Long lectureId) {
        int ret = 0;

        try {
            List<UserLectureSchedule> userLectureScheduleList = userLectureScheduleRepository.findByLecture_LectureId(lectureId).orElseThrow(CUserLectureScheduleNotFoundException::new);
            ret = userLectureScheduleList.size();

            for(UserLectureSchedule userLectureSchedule : userLectureScheduleList) {
                userLectureScheduleRepository.delete(userLectureSchedule);
            }
        } catch(CUserLectureScheduleNotFoundException e) {
            e.printStackTrace();
        } finally {
            return ret;
        }
    }

    /**
     * 
     * @param userId : 탈퇴한 수강생 id
     * @return : 수강생이 탈퇴하면서 삭제될 수강 내역 개수
     */
    public int deleteUserLectureScheduleByUserId(Long userId) {
        int ret = 0;

        try {
            List<UserLectureSchedule> userLectureScheduleList = userLectureScheduleRepository.findByUser_UserId(userId).orElseThrow(CUserLectureScheduleNotFoundException::new);
            ret = userLectureScheduleList.size();

            for(UserLectureSchedule userLectureSchedule : userLectureScheduleList) {
                userLectureScheduleRepository.delete(userLectureSchedule);
            }
        } catch(CUserLectureScheduleNotFoundException e) {
            e.printStackTrace();
        } finally {
            return ret;
        }
    }
}
