package com.yuj.lecture.repository;

import com.yuj.lecture.domain.UserLecture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserLectureRepository extends JpaRepository<UserLecture, Long> {
    Optional<List<UserLecture>> findByLecture_LectureId(Long lectureId);

    Optional<List<UserLecture>> findByUser_UserId(Long userId);

    Optional<UserLecture> findByUser_UserIdAndLecture_LectureId(Long userId, Long lectureId);

    // 수강 후기 관련 쿼리
    
    @Query(value = "select ul from UserLecture ul where ul.review is not null and ul.state=true and ul.lecture.lectureId in (select distinct (l.lectureId) from Lecture l join l.user u where u.userId = :userId) order by ul.reviewUpdateDate desc")
    List<UserLecture> getReviewsByUserId(@Param("userId") Long userId);
	
}
