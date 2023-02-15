package com.yuj.mypage.controller;

import com.yuj.mypage.dto.request.MyPageUserInfoRequestDTO;
import com.yuj.mypage.dto.response.MyPageLectureScheduleResponseDTO;
import com.yuj.mypage.dto.response.MyPageUserLectureResponseDTO;
import com.yuj.mypage.dto.response.MyPageUserLectureScheduleResponseDTO;
import com.yuj.mypage.service.MyPageService;
import com.yuj.user.domain.User;
import io.swagger.annotations.ApiOperation;
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
    @ApiOperation(value = "모든 강의 가져오기", notes = "userId를 이용하여 수강한 모든 강의를 가져옵니다.")
    @GetMapping("/dashboard/{userId}")
    public ResponseEntity<?> getUserLecture(@PathVariable Long userId) {
        List<MyPageUserLectureResponseDTO> userLecturesById = myPageService.getAllUserLecturesById(userId);

        if (userLecturesById != null) {
            return ResponseEntity.ok().body(userLecturesById);
        } else if (userLecturesById == null) {
            return ResponseEntity.ok().body("수강한 강의가 없습니다.");
        }
        //오늘날짜이후로 가장 가까운 start시간 3개로해야함 일단은 전체 lecture라도 반환해보기

        return ResponseEntity.badRequest().body("오류가 발생하였습니다.");

//        return new ResponseEntity(userLecturesById, HttpStatus.OK);
    }

    // 현재 수강중인 강의만 가져오기(진행중)
    @ApiOperation(value = "수강중인 강의 가져오기", notes = "userId를 이용하여 현재 수강중인 강의를 가져옵니다.")
    @GetMapping("/dashboard/currentlectures/{userId}")
    public ResponseEntity<?> getCurrentLectures(@PathVariable Long userId) throws Exception {
        List<MyPageUserLectureResponseDTO> userLecturesById = myPageService.getCurrentLecturesById(userId);
        if (userLecturesById != null) {
            return ResponseEntity.ok().body(userLecturesById);
        } else if (userLecturesById == null) {
            return ResponseEntity.ok().body("진행중인 강의가 없습니다.");
        }
        //오늘날짜이후로 가장 가까운 start시간 3개로해야함 일단은 전체 lecture라도 반환해보기
        return ResponseEntity.badRequest().body("오류가 발생하였습니다.");
    }

    // 수강 완료된 강의만 가져오기
    @ApiOperation(value = "수강 완료된 강의 가져오기", notes = "userId를 이용하여 강의 endDate가 끝난 강의를 모두 가져옵니다.")
    @GetMapping("/dashboard/completedlectures/{userId}")
    public ResponseEntity<?> getCompletedLectures(@PathVariable Long userId) throws Exception {
        List<MyPageUserLectureResponseDTO> userLecturesById = myPageService.getCompletedLecturesById(userId);

        if (userLecturesById != null) {
            System.out.println("수강완료된강의 컨트롤러 리턴 성공");
            return ResponseEntity.ok().body(userLecturesById);
        } else if (userLecturesById == null) {
            return ResponseEntity.ok().body("수강 완료한 강의가 없습니다.");
        }
        return ResponseEntity.badRequest().body("오류가 발생하였습니다.");
    }


    @ApiOperation(value = "강의스케쥴 가져오기", notes = "lectureId를 기반으로 하여 강의 스케쥴을 가져옵니다.")
    @GetMapping("/dashboard/lectureSchedule/{lectureId}")
    public ResponseEntity<?> getLectureSchedule(@PathVariable Long lectureId) {
        List<MyPageLectureScheduleResponseDTO> lectureScheduleByLectureId = myPageService.getLectureScheduleByLectureId(lectureId);

        if (lectureScheduleByLectureId != null) {
            return ResponseEntity.ok().body(lectureScheduleByLectureId);
        } else if (lectureScheduleByLectureId == null) {
            return ResponseEntity.ok().body("강의 정보가 없습니다.");
        }

        return ResponseEntity.badRequest().body("오류가 발생하였습니다.");
    }

    @GetMapping("/dashboard/userLectureSchedule/{userId}")
    public ResponseEntity<?> getUserLectureSchedule(@PathVariable long userId){
        List<MyPageUserLectureScheduleResponseDTO> userLectureScheduleResponseDTOS = myPageService.getUserLectureScheduleByUserId(userId);
        
        if(userLectureScheduleResponseDTOS != null){
            return ResponseEntity.ok().body(userLectureScheduleResponseDTOS);
        }
        else if(userLectureScheduleResponseDTOS == null){
            return ResponseEntity.ok().body("강의 정보가 없습니다.");
        }

        return ResponseEntity.badRequest().body("오류가 발생하였습니다.");

    }
    //    유저정보수정
    @ApiOperation(value = "회원 정보 수정", notes = "마이페이지 회원 정보 form을 통해 회원 정보를 수정합니다.")
    @PatchMapping("/info/{userId}")
    public ResponseEntity<User> userUpdate(@RequestBody MyPageUserInfoRequestDTO myPageUserInfoRequestDTO, @PathVariable Long userId) {
        Optional<User> user = this.myPageService.updateUser(userId, myPageUserInfoRequestDTO);

        return new ResponseEntity(user, HttpStatus.OK);
    }

}
