package com.yuj.lecture.repository;

import com.yuj.lecture.domain.UserLecture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserLectureRepository extends JpaRepository<UserLecture, Long> {
    Optional<List<UserLecture>> findByLecture_LectureId(Long lectureId);

    Optional<List<UserLecture>> findByUser_UserId(Long userId);

    Optional<UserLecture> findByUser_UserIdAndLecture_LectureId(Long userId, Long lectureId);

}
