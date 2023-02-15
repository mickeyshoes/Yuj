package com.yuj.lecture.repository;

import com.yuj.lecture.domain.UserLecture;
import com.yuj.lecture.domain.UserLectureSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserLectureScheduleRepository extends JpaRepository<UserLectureSchedule, Long> {
    Optional<List<UserLectureSchedule>> findByUser_UserIdAndLecture_LectureId(Long userId, Long lectureId);
}
