package com.yuj.studio.controller;

import com.yuj.lecture.dto.response.LectureResponseDTO;
import com.yuj.lecture.service.LectureService;
import com.yuj.studio.dto.response.StudioResponseDTO;
import com.yuj.studio.service.StudioService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/studio")
@RequiredArgsConstructor
public class StudioController {

    private final StudioService studioService;
    private final LectureService lectureService;

    @GetMapping("/{userId}")
    public ResponseEntity<StudioResponseDTO> getStudio(@PathVariable Long userId) throws Exception {

        log.info("getStudio controller");
        log.info("userId : {}",userId);
        StudioResponseDTO studioResponseDTO = studioService.getStudioByUserId(userId);

        return ResponseEntity.status(HttpStatus.OK).body(studioResponseDTO);
    }

    @GetMapping("/{userId}/lectures")
    public ResponseEntity<List<LectureResponseDTO>> getLecturesByUserId(@PathVariable Long userId) throws Exception {
        log.info("getLecturesByUserId controller");
        log.info("userId : {}", userId);
        List<LectureResponseDTO> lectureResponseDTOList = lectureService.getLecturesByUserId(userId);

        return ResponseEntity.status(HttpStatus.OK).body(lectureResponseDTOList);
    }

    @GetMapping("/{userId}/checkLive")
    public ResponseEntity<LectureResponseDTO> getActiveLecture(@PathVariable Long userId) throws Exception {
        log.info("checkLectureLive controller");
        log.info("userId : {}", userId);
        LectureResponseDTO lectureResponseDTO = lectureService.getActiveLectureByUserId(userId);

        return ResponseEntity.status(HttpStatus.OK).body(lectureResponseDTO);
    }

    // 위의 강사별 강의 리스트 중, 셀렉트박스에서 선택된 요가 카테고리에 부합하는 강의 리스트를 반환
    @GetMapping("/{userId}/lectures/{yogaId}")
    public ResponseEntity<List<LectureResponseDTO>> getLecturesByUserIdAndYogaId(@PathVariable Long userId, @PathVariable Long yogaId) throws  Exception {
        log.info("getLecturesByUserIdAndYogaId controller");
        List<LectureResponseDTO> lectureResponseDTOList = lectureService.getLecturesByUserIdAndYogaId(userId, yogaId);

        return ResponseEntity.status(HttpStatus.OK).body(lectureResponseDTOList);
    }

}