package com.yuj.mypage.repository;

import com.yuj.lecture.domain.Lecture;
import com.yuj.lecture.domain.UserLecture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MyPageUserLectureRepository extends JpaRepository<UserLecture, Long> {

    //유저 Id로 강의가져오기
    List<UserLecture> findAllByUser_UserId(long userId);

}