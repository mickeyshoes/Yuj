package com.yuj.lecture.repository;

import com.yuj.lecture.domain.Lecture;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface LectureRepository extends JpaRepository<Lecture, Long> {
    Optional<List<Lecture>> findByUser_UserId(Long userId);
    Optional<Lecture> findByUser_UserIdAndIsActiveTrue(Long userId);
    
 // 강의 이름에 name 키워드가 들어있다면 모두 반환
    @Query(value = "select l from Lecture l where l.name like %:name% and l.endDate >= :threshold order by l.registDate desc")
    List<Lecture> findLecture(@Param("name") String name, @Param("threshold") LocalDate threshold);
    
    @Query(value = "select l from Lecture l where l.name like %:name% and l.endDate < :threshold order by l.registDate desc")
    List<Lecture> findLecture2(@Param("name") String name, @Param("threshold") LocalDate threshold);
}
