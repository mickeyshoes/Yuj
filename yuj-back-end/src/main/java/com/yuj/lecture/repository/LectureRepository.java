package com.yuj.lecture.repository;

import com.yuj.lecture.domain.Lecture;
import com.yuj.lecture.domain.UserLecture;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface LectureRepository extends JpaRepository<Lecture, Long> {

    Optional<List<Lecture>> findByUser_UserIdAndIsActiveTrue(Long userId);
    @Query(value = "select l from Lecture l join l.user u where u.userId = :userId and l.endDate >= :threshold order by l.registDate desc")
    List<Lecture> findLectureByUserId(@Param("userId") Long userId, @Param("threshold") LocalDate threshold);

    @Query(value = "select l from Lecture l join l.user u where u.userId = :userId and l.endDate < :threshold order by l.registDate desc")
    List<Lecture> findLectureEndByUserId(@Param("userId") Long userId, @Param("threshold") LocalDate threshold);
    
    // 강의 이름에 name 키워드가 들어있다면 모두 반환
    @Query(value = "select l from Lecture l where l.name like %:name% and l.endDate >= :threshold order by l.registDate desc")
    List<Lecture> findLecture(@Param("name") String name, @Param("threshold") LocalDate threshold);
    
    @Query(value = "select l from Lecture l where l.name like %:name% and l.endDate < :threshold order by l.registDate desc")
    List<Lecture> findLectureEnd(@Param("name") String name, @Param("threshold") LocalDate threshold);

    // 강사 아이디와 요가 아이디를 통해 강의 검색
    @Query(value = "select l from Lecture l join l.user u on u.userId = :userId join l.yoga y on y.yogaId = :yogaId where l.endDate >= :threshold order by l.registDate desc")
    List<Lecture> findLectureByUserIdAndYogaId(@Param("userId") Long userId, @Param("yogaId") Long yogaId, @Param("threshold") LocalDate threshold);

    @Query(value = "select l from Lecture l join l.user u on u.userId = :userId join l.yoga y on y.yogaId = :yogaId where l.endDate < :threshold order by l.registDate desc")
    List<Lecture> findLectureEndByUserIdAndYogaId(@Param("userId") Long userId, @Param("yogaId") Long yogaId, @Param("threshold") LocalDate threshold);
	
    
 // 강의 이름에 name 키워드 & 요가 아이디가 들어있다면 모두 반환
    @Query(value = "select l from Lecture l join l.yoga y on y.yogaId = :yogaId where l.name like %:name% and l.endDate >= :threshold order by l.registDate desc")
    List<Lecture> findLectureByYoga(@Param("name") String name, @Param("yogaId") Long yogaId, @Param("threshold") LocalDate threshold);
    
    @Query(value = "select l from Lecture l join l.yoga y on y.yogaId = :yogaId where l.name like %:name% and l.endDate < :threshold order by l.registDate desc")
    List<Lecture> findLectureEndByYoga(@Param("name") String name, @Param("yogaId") Long yogaId, @Param("threshold") LocalDate threshold);
    
}
