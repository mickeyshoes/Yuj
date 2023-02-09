package com.yuj.mypage.controller;

import com.yuj.lecture.domain.Lecture;
import com.yuj.lecture.domain.LectureSchedule;
import com.yuj.lecture.domain.UserLecture;
import com.yuj.mypage.dto.request.MyPageRequestDTO;
import com.yuj.mypage.dto.response.MyPageResponseDTO;
import com.yuj.mypage.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class MyPageController {

    private final MyPageService myPageService;

    @GetMapping("/dashboard/{userId}")
    public ResponseEntity<?> getUserLecture(@PathVariable long userId) {
        List<UserLecture> userLecturesById = myPageService.getUserLecturesById(userId);

        if(userLecturesById != null){
            return ResponseEntity.ok().body(userLecturesById);
        }
        else if (userLecturesById == null){
            return ResponseEntity.ok().body("수강중인 강의가 없습니다.");
        }
        //오늘날짜이후로 가장 가까운 start시간 3개로해야함 일단은 전체 lecture라도 반환해보기

        return ResponseEntity.badRequest().body("오류가 발생하였습니다.");


//        return new ResponseEntity(userLecturesById, HttpStatus.OK);
    }

    @GetMapping("/dashboard/lectureSchedule/{lectureId}")
    public ResponseEntity<?> getLectureSchedule(@PathVariable long lectureId){
        List<LectureSchedule> lectureScheduleByLectureId = myPageService.getLectureScheduleByLectureId(lectureId);

        System.out.println("lectureScheduleByLectureId = " + lectureScheduleByLectureId);

        if(lectureScheduleByLectureId != null){
            return ResponseEntity.ok().body(lectureScheduleByLectureId);
        }
        else if(lectureScheduleByLectureId == null){
            return ResponseEntity.ok().body("강의 정보가 없습니다.");
        }

        return ResponseEntity.badRequest().body("오류가 발생하였습니다.");

    }


    @GetMapping("/info/1")
    public ResponseEntity<?> Test1() {

        MyPageResponseDTO dto = new MyPageResponseDTO(1L, "2", "3", "4", "5", "6");

        return new ResponseEntity(dto, HttpStatus.OK);
    }

    @GetMapping("/test")
    public ResponseEntity<?> Test() {
        return new ResponseEntity<>("success", HttpStatus.BAD_GATEWAY);
    }

//    @PutMapping("/info/{id}")
//    public ResponseEntity<User> updateUser(@PathVariable("id") Long id, @RequestBody MyPageRequestDTO myPageRequestDTO) {
//        myPageRequestDTO.setId(id);
//        return myPageService.updateUser(myPageRequestDTO);
//        User updatedUser = userService.updateUser(id, user);
//        return ResponseEntity.ok(updatedUser);
//    }
}
