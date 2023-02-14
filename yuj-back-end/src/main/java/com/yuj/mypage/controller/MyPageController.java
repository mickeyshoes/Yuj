package com.yuj.mypage.controller;

import com.yuj.mypage.dto.request.MyPageUserInfoRequestDTO;
import com.yuj.mypage.dto.response.MyPageLectureScheduleResponseDTO;
import com.yuj.mypage.dto.response.MyPageUserLectureResponseDTO;
import com.yuj.mypage.service.MyPageService;
import com.yuj.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class MyPageController {

    private final MyPageService myPageService;

    //userId기반 모든 강의 가져오기
    @GetMapping("/dashboard/{userId}")
    public ResponseEntity<?> getUserLecture(@PathVariable Long userId) {
        List<MyPageUserLectureResponseDTO> userLecturesById = myPageService.getAllUserLecturesById(userId);
        System.out.println("마이페이지 userId기반 컨트롤러진입후 할당");

        if (userLecturesById != null) {
            System.out.println("마이페이지userId기반  컨트롤러정상반환");
            return ResponseEntity.ok().body(userLecturesById);
        } else if (userLecturesById == null) {
            System.out.println("마이페이지userId기반  컨트롤러널");
            return ResponseEntity.ok().body("수강한 강의가 없습니다.");
        }
        //오늘날짜이후로 가장 가까운 start시간 3개로해야함 일단은 전체 lecture라도 반환해보기

        System.out.println("마이페이지 userId기반  컨트롤러 뭔가 오류");
        return ResponseEntity.badRequest().body("오류가 발생하였습니다.");

//        return new ResponseEntity(userLecturesById, HttpStatus.OK);
    }

    // 현재 수강중인 강의만 가져오기(진행중)
    @GetMapping("/dashboard/currentlectures/{userId}")
    public ResponseEntity<?> getCurrentLectures(@PathVariable Long userId) throws Exception {
        List<MyPageUserLectureResponseDTO> userLecturesById = myPageService.getCurrentLecturesById(userId);
        System.out.println("현재수강중강의 가져오기 컨트롤러 진입");
        if (userLecturesById != null) {
            System.out.println("현재수강중강의 가져오기 컨트롤러 성공");
            return ResponseEntity.ok().body(userLecturesById);
        } else if (userLecturesById == null) {
            return ResponseEntity.ok().body("진행중인 강의가 없습니다.");
        }
        //오늘날짜이후로 가장 가까운 start시간 3개로해야함 일단은 전체 lecture라도 반환해보기
        return ResponseEntity.badRequest().body("오류가 발생하였습니다.");
    }

    // 수강 완료된 강의만 가져오기
    @GetMapping("/dashboard/completedlectures/{userId}")
    public ResponseEntity<?> getCompletedLectures(@PathVariable Long userId) throws Exception {
        List<MyPageUserLectureResponseDTO> userLecturesById = myPageService.getCompletedLecturesById(userId);
        System.out.println("수강완료된강의 컨트롤러 진입");

        if (userLecturesById != null) {
            System.out.println("수강완료된강의 컨트롤러 리턴 성공");
            return ResponseEntity.ok().body(userLecturesById);
        } else if (userLecturesById == null) {
            return ResponseEntity.ok().body("수강 완료한 강의가 없습니다.");
        }
        return ResponseEntity.badRequest().body("오류가 발생하였습니다.");
    }


    @GetMapping("/dashboard/lectureSchedule/{lectureId}")
    public ResponseEntity<?> getLectureSchedule(@PathVariable Long lectureId) {
        List<MyPageLectureScheduleResponseDTO> lectureScheduleByLectureId = myPageService.getLectureScheduleByLectureId(lectureId);

        System.out.println("lectureScheduleByLectureId = " + lectureScheduleByLectureId);

        if (lectureScheduleByLectureId != null) {
            return ResponseEntity.ok().body(lectureScheduleByLectureId);
        } else if (lectureScheduleByLectureId == null) {
            return ResponseEntity.ok().body("강의 정보가 없습니다.");
        }

        return ResponseEntity.badRequest().body("오류가 발생하였습니다.");
    }

    //    유저정보수정
    @PatchMapping("/info/{userId}")
    public ResponseEntity<User> userUpdate(@RequestBody MyPageUserInfoRequestDTO myPageUserInfoRequestDTO, @PathVariable Long userId) {
        Optional<User> user = this.myPageService.updateUser(userId, myPageUserInfoRequestDTO);
        System.out.println("userUpdate 컨트롤러에 도착");
        System.out.println(user);

        return new ResponseEntity(user, HttpStatus.OK);
    }

}
