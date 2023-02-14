package com.yuj.mypage.repository;

import com.yuj.lecture.domain.UserLecture;
import com.yuj.lecture.domain.UserLectureSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MyPageUserLectureScheduleRepository extends JpaRepository<UserLectureSchedule, Long> {

    //유저 Id로 수강내역 가져오기
    List<UserLectureSchedule> findAllByUser_UserId(long userId);

}