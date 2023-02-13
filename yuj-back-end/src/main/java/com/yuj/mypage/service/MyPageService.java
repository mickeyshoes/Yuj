package com.yuj.mypage.service;

import com.yuj.lecture.domain.Lecture;
import com.yuj.lecture.domain.LectureSchedule;
import com.yuj.lecture.domain.UserLecture;
import com.yuj.lecture.domain.Yoga;
import com.yuj.lecture.repository.LectureRepository;
import com.yuj.lecture.repository.LectureScheduleRepository;
import com.yuj.mypage.dto.request.MyPageRequestDTO;

import com.yuj.mypage.dto.response.MyPageLectureScheduleResponseDTO;
import com.yuj.mypage.dto.response.MyPageUserLectureResponseDTO;
import com.yuj.mypage.repository.MyPageUserLectureRepository;
import com.yuj.user.domain.User;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final MyPageUserLectureRepository myPageUserLectureRepository;

    private final LectureScheduleRepository lectureScheduleRepository;

    public List<MyPageUserLectureResponseDTO> getUserLecturesById(long userId){
        List<UserLecture> allByUserUserId = myPageUserLectureRepository.findAllByUser_UserId(userId);

        List<MyPageUserLectureResponseDTO>myPageUserLectureResponseDTOS = new ArrayList<>();

        for(UserLecture dto : allByUserUserId){
            myPageUserLectureResponseDTOS.add(entityToUserLectureResponseDTO(dto));
        }

        return myPageUserLectureResponseDTOS;
    }
    public List<MyPageLectureScheduleResponseDTO> getLectureScheduleByLectureId(long lectureId){
        List<LectureSchedule> allByLectureLectureId = lectureScheduleRepository.findAllByLecture_LectureId(lectureId);

        List<MyPageLectureScheduleResponseDTO> myPageLectureScheduleResponseDTOS = new ArrayList<>();

        for(LectureSchedule dto : allByLectureLectureId){
            myPageLectureScheduleResponseDTOS.add(entityToLectureScheduleResponseDTO(dto));
        }

        return myPageLectureScheduleResponseDTOS;

    }

    private MyPageUserLectureResponseDTO entityToUserLectureResponseDTO(UserLecture userLecture){
        User user = userLecture.getUser();
        Lecture lecture = userLecture.getLecture();
        Yoga yoga = lecture.getYoga();

        return MyPageUserLectureResponseDTO.builder().
                userLectureId(userLecture.getUserLectureId()).
                userRegistDate(userLecture.getRegistDate()).
                userLectureId(userLecture.getUserLectureId()).
                userId(user.getUserId()).
                id(user.getId()).
                nickname(user.getNickname()).
                profileImagePath(user.getProfileImagePath()).
                lectureId(lecture.getLectureId()).
                name(lecture.getName()).
                thumbnailImage(lecture.getThumbnailImage()).
                lectureRegistDate(lecture.getRegistDate()).
                startDate(lecture.getStartDate()).
                endDate(lecture.getEndDate()).
                limitStudents(lecture.getLimitStudents()).
                totalCount(lecture.getTotalCount()).
                isActive(lecture.isActive()).
                description(lecture.getDescription()).
                englishName(yoga.getEnglishName()).
                build();
    }

    private MyPageLectureScheduleResponseDTO entityToLectureScheduleResponseDTO(LectureSchedule lectureSchedule){
        Lecture lecture = lectureSchedule.getLecture();

        return MyPageLectureScheduleResponseDTO.builder().
                scheduleId(lectureSchedule.getScheduleId()).
                startTime(lectureSchedule.getStartTime()).
                endTime(lectureSchedule.getEndTime()).
                day(lectureSchedule.getDay()).
                lectureId(lecture.getLectureId()).
                build();
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
