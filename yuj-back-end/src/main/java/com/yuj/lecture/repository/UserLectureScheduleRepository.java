package com.yuj.lecture.repository;

import com.yuj.lecture.domain.UserLecture;
import com.yuj.lecture.domain.UserLectureSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserLectureScheduleRepository extends JpaRepository<UserLectureSchedule, Long> {
    /* 수강생 pk가 userId이고, 강의 pk가 lectureId인 강의 참가 내역 */
    Optional<List<UserLectureSchedule>> findByUser_UserIdAndLecture_LectureId(Long userId, Long lectureId);

    /* 수강생 pk가 userId인 참가 내역 */
    Optional<List<UserLectureSchedule>> findByUser_UserId(Long userId);

    /* 강의 pk가 lectureId인 참가 내역 */
    Optional<List<UserLectureSchedule>> findByLecture_LectureId(Long lectureId);
}
