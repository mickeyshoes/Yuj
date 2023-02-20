package com.yuj.lecture.repository;

import com.yuj.lecture.domain.LectureSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LectureScheduleRepository extends JpaRepository<LectureSchedule, Long> {
    Optional<List<LectureSchedule>> findAllByLecture_LectureId(long LectureId);
}
