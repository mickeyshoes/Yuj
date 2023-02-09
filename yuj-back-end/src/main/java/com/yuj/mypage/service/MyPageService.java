package com.yuj.mypage.service;

import com.yuj.lecture.domain.Lecture;
import com.yuj.lecture.domain.LectureSchedule;
import com.yuj.lecture.domain.UserLecture;
import com.yuj.lecture.repository.LectureRepository;
import com.yuj.lecture.repository.LectureScheduleRepository;
import com.yuj.mypage.dto.request.MyPageRequestDTO;

import com.yuj.mypage.repository.MyPageUserLectureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final MyPageUserLectureRepository myPageUserLectureRepository;

    private final LectureScheduleRepository lectureScheduleRepository;

    public List<UserLecture> getUserLecturesById(long userId){
        return myPageUserLectureRepository.findAllByUser_UserId(userId);
    }
    public List<LectureSchedule> getLectureScheduleByLectureId(long lectureId){
        return lectureScheduleRepository.findAllByLecture_LectureId(lectureId);
    }
//    private final MyPageRepository myPageRepository;
//
//    @Autowired
//    public MyPageService(MyPageRepository myPageRepository) {
//        this.myPageRepository = myPageRepository;
//    }
//
//    public updateUser(MyPageRequestDTO){
//        User user = MyPageRepository.findById(userDto.getId()).orElse(null);
//        if (user == null) {
//            throw new RuntimeException("User not found");
//        }
//
//        user.setProfileImage(userDto.getProfileImage());
//        user.setNickname(userDto.getNickname());
//        user.setPassword(userDto.getPassword());
//        user.setPhone(userDto.getPhone());
//        user.setEmail(userDto.getEmail());
//
//        return userRepository.save(user);
//    }
}
