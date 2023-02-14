package com.yuj.mypage.service;

import com.yuj.lecture.domain.*;
import com.yuj.lecture.repository.LectureRepository;
import com.yuj.lecture.repository.LectureScheduleRepository;

import com.yuj.mypage.dto.request.MyPageUserInfoRequestDTO;
import com.yuj.mypage.dto.response.MyPageLectureScheduleResponseDTO;
import com.yuj.mypage.dto.response.MyPageUserLectureResponseDTO;
import com.yuj.mypage.dto.response.MyPageUserLectureScheduleResponseDTO;
import com.yuj.mypage.repository.MyPageUserInfoRepository;
import com.yuj.mypage.repository.MyPageUserLectureRepository;
import com.yuj.mypage.repository.MyPageUserLectureScheduleRepository;
import com.yuj.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final MyPageUserLectureRepository myPageUserLectureRepository;
    private final LectureScheduleRepository lectureScheduleRepository;
    private final MyPageUserLectureScheduleRepository myPageUserLectureScheduleRepository;

    private final MyPageUserInfoRepository myPageUserInfoRepository;

    //    userId를 사용하여 수강하고있는 모든 강의정보 가져오기
    public List<MyPageUserLectureResponseDTO> getAllUserLecturesById(long userId) {
        List<UserLecture> allByUserUserId = myPageUserLectureRepository.findAllByUser_UserId(userId);

        List<MyPageUserLectureResponseDTO> myPageUserLectureResponseDTOS = new ArrayList<>();

        for (UserLecture dto : allByUserUserId) {
            myPageUserLectureResponseDTOS.add(entityToUserLectureResponseDTO(dto));
        }

        return myPageUserLectureResponseDTOS;
    }

    //    userId기반 모든 강의중에 현재 수강중인 강의만 가져오기
    public List<MyPageUserLectureResponseDTO> getCurrentLecturesById(long userId) throws Exception {
        //서버 시간 가져오기
        URL url = new URL("https://i8a504.p.ssafy.io");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("HEAD");
        Date serverDate = new Date(conn.getHeaderFieldDate("Date", 0)); //서버시간 serverDate
        LocalDate localDate = serverDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        List<UserLecture> allByUserUserId = myPageUserLectureRepository.findAllByUser_UserId(userId);

        List<MyPageUserLectureResponseDTO> myPageUserLectureResponseDTOS = new ArrayList<>();

        for (UserLecture dto : allByUserUserId) {
            if (dto.getLecture().getEndDate().isAfter(localDate)) {
                myPageUserLectureResponseDTOS.add(entityToUserLectureResponseDTO(dto));
            }
        }
        return myPageUserLectureResponseDTOS;
    }

    //    userId기반 모든 강의중에 완료된 강의만 가져오기
    public List<MyPageUserLectureResponseDTO> getCompletedLecturesById(long userId) throws Exception {
        //서버 시간 가져오기
        URL url = new URL("https://i8a504.p.ssafy.io");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("HEAD");
        Date serverDate = new Date(conn.getHeaderFieldDate("Date", 0)); //서버시간 serverDate
        LocalDate localDate = serverDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        List<UserLecture> allByUserUserId = myPageUserLectureRepository.findAllByUser_UserId(userId);

        List<MyPageUserLectureResponseDTO> myPageUserLectureResponseDTOS = new ArrayList<>();

        for (UserLecture dto : allByUserUserId) {
            if (dto.getLecture().getEndDate().isBefore(localDate)) {
                myPageUserLectureResponseDTOS.add(entityToUserLectureResponseDTO(dto));
            }
        }
        return myPageUserLectureResponseDTOS;
    }

    //    lectureId를 사용하여 모든 강의 스케쥴 가져오기
    public List<MyPageLectureScheduleResponseDTO> getLectureScheduleByLectureId(long lectureId) {
        List<LectureSchedule> allByLectureLectureId = lectureScheduleRepository.findAllByLecture_LectureId(lectureId);

        List<MyPageLectureScheduleResponseDTO> myPageLectureScheduleResponseDTOS = new ArrayList<>();

        for (LectureSchedule dto : allByLectureLectureId) {
            myPageLectureScheduleResponseDTOS.add(entityToLectureScheduleResponseDTO(dto));
        }

        return myPageLectureScheduleResponseDTOS;
    }

    public List<MyPageUserLectureScheduleResponseDTO> getUserLectureScheduleByUserId(long userId){
        List<UserLectureSchedule> userLectureSchedules = myPageUserLectureScheduleRepository.findAllByUser_UserId(userId);

        List<MyPageUserLectureScheduleResponseDTO> DTOList = new ArrayList<>();

        for(UserLectureSchedule userLectureSchedule : userLectureSchedules){
            DTOList.add(entityToUserLectureScheduleResponseDTO(userLectureSchedule));
        }

        return DTOList;

    }


    private MyPageUserLectureResponseDTO entityToUserLectureResponseDTO(UserLecture userLecture){
        User user = userLecture.getUser();
//    유저 정보 수정

    public Optional<User> updateUser(Long userId, MyPageUserInfoRequestDTO myPageUserInfoRequestDTO) {
        Optional<User> user = this.myPageUserInfoRepository.findById(userId);

        user.ifPresent(u -> {
            if (myPageUserInfoRequestDTO.getProfileImage() != null) {
                u.setProfileImagePath(myPageUserInfoRequestDTO.getProfileImage());
            }
            if (myPageUserInfoRequestDTO.getNickname() != null) {
                u.setNickname(myPageUserInfoRequestDTO.getNickname());
            }
            if (myPageUserInfoRequestDTO.getPassword() != null) {
                u.setPassword(myPageUserInfoRequestDTO.getPassword());
            }
            if (myPageUserInfoRequestDTO.getPhone() != null) {
                u.setPhone(myPageUserInfoRequestDTO.getPhone());
            }
            if (myPageUserInfoRequestDTO.getEmail() != null) {
                u.setEmail(myPageUserInfoRequestDTO.getEmail());
            }
            this.myPageUserInfoRepository.save(u);
        });
        return user;
    }


    private MyPageUserLectureResponseDTO entityToUserLectureResponseDTO(UserLecture userLecture) {

        Lecture lecture = userLecture.getLecture();
        User user = lecture.getUser();
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

    private MyPageLectureScheduleResponseDTO entityToLectureScheduleResponseDTO(LectureSchedule lectureSchedule) {
        Lecture lecture = lectureSchedule.getLecture();

        return MyPageLectureScheduleResponseDTO.builder().
                scheduleId(lectureSchedule.getScheduleId()).
                startTime(lectureSchedule.getStartTime()).
                endTime(lectureSchedule.getEndTime()).
                day(lectureSchedule.getDay()).
                lectureId(lecture.getLectureId()).
                build();
    }

    private MyPageUserLectureScheduleResponseDTO entityToUserLectureScheduleResponseDTO(UserLectureSchedule userlectureSchedule){
        return MyPageUserLectureScheduleResponseDTO.builder()
                .userLectureScheduleId(userlectureSchedule.getUserLectureScheduleId())
                .attendanceDate(userlectureSchedule.getAttendanceDate())
                .isAttendance(userlectureSchedule.isAttendance())
                .userId(userlectureSchedule.getUser().getUserId())
                .lectureId(userlectureSchedule.getLecture().getLectureId())
                .build();
    }
}
