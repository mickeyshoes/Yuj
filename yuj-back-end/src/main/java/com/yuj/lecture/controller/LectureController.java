package com.yuj.lecture.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.util.json.JSONParser;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yuj.lecture.dto.request.LectureReviewRequestDTO;
import com.yuj.lecture.dto.request.LectureScheduleRegistDTO;
import com.yuj.lecture.dto.request.LectureUpdateActiveRequestDTO;
import com.yuj.lecture.dto.request.LectureVO;
import com.yuj.lecture.dto.response.LectureResponseDTO;
import com.yuj.lecture.dto.response.LectureReviewResponseDTO;
import com.yuj.lecture.service.LectureService;
import com.yuj.lectureimage.handler.FileHandler;
import com.yuj.lectureimage.service.LectureImageService;
import com.yuj.user.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/lectures")
@RequiredArgsConstructor
@Slf4j
public class LectureController {

    private final LectureService lectureService;
    private final UserService userService;
    private final LectureImageService lectureImageService;

    private final FileHandler fileHandler;

    @PostMapping
    public ResponseEntity<?> registLecture(
//            @RequestPart(value="files", required = false) List<MultipartFile> files,
            @RequestPart(value = "files", required = false) List<MultipartFile> files,

//            @RequestPart(value = "files", required = false) List<MultipartFile> files,
//            @RequestPart(value = "files", required = false) MultipartFile[][] files,
            @RequestParam(value = "vo") String lectureVOString,
            @RequestParam(value = "scheduleArr", required = false) String scheduleArr
    ) {
        log.info("registLecture in Lecture Controller");
        log.info("files = " + files);
        log.info("lectureVOString = " + lectureVOString);
        log.info("scheduleArr = " + scheduleArr);

        try {
            JSONParser jsonParser = new JSONParser(lectureVOString);
            Object obj = jsonParser.parse();
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> map = mapper.convertValue(obj, Map.class);
            log.info("obj = " + obj);
            log.info("map = " + map);

            LectureVO lectureVO = LectureVO.builder()
                    .userId(Long.parseLong(String.valueOf(map.get("userId"))))
                    .yogaId(Long.parseLong(String.valueOf(map.get("yogaId"))))
                    .name(String.valueOf(map.get("name")))
                    .description(String.valueOf(map.get("description")))
                    .startDate(LocalDate.parse(String.valueOf(map.get("startDate")), DateTimeFormatter.ISO_DATE))
                    .endDate(LocalDate.parse(String.valueOf(map.get("endDate")), DateTimeFormatter.ISO_DATE))
                    .registDate(LocalDate.parse(String.valueOf(map.get("registDate")), DateTimeFormatter.ISO_DATE))
                    .limitStudents(Integer.parseInt(String.valueOf(map.get("limitStudents"))))
                    .fee(Integer.parseInt(String.valueOf(map.get("fee"))))
                    .totalCount(Integer.parseInt(String.valueOf(map.get("totalCount"))))
                    .build();

            log.info("VO = " + lectureVO);

//            List<LectureScheduleRegistDto> lsrDtos = new ArrayList<>();
//            for(String schedulVOString :scheduleArr) {
//                jsonParser = new JSONParser(schedulVOString);
//                obj = jsonParser.parse();
//                mapper = new ObjectMapper();
//                map = mapper.convertValue(obj, Map.class);
//
//                LectureScheduleRegistDto dto = LectureScheduleRegistDto.builder()
//                        .startTime(LocalTime.parse(String.valueOf(map.get("startTime")), DateTimeFormatter.ISO_DATE))
//                        .endTime(LocalTime.parse(String.valueOf(map.get("endTime")), DateTimeFormatter.ISO_DATE_TIME))
//                        .day(Integer.parseInt(String.valueOf(map.get("day"))))
//                        .build();
//
//                lsrDtos.add(dto);
//            }

            List<LectureScheduleRegistDTO> lsrDtos = new ArrayList<>();
//            JSONArray jsonArray = new JSONArray(scheduleArr);
//            log.info("jsonArray = " + jsonArray);

            if (scheduleArr != null) {
                JSONArray jsonArray = new JSONArray(scheduleArr);
                log.info("jsonArray = " + jsonArray);

                for (int i = 0; i < jsonArray.length(); i++) {
                    JSONObject jsonObj = jsonArray.getJSONObject(i);
//                log.info("jsonObj : " + jsonObj);
                    LectureScheduleRegistDTO dto = LectureScheduleRegistDTO.builder()
                            .startTime(LocalTime.parse(String.valueOf(jsonObj.get("startTime")) + ":00"))
                            .endTime(LocalTime.parse(String.valueOf(jsonObj.get("endTime")) + ":00"))
                            .day(Integer.parseInt(String.valueOf(jsonObj.get("day"))))
                            .build();

                    log.info("dto : " + dto);
                    lsrDtos.add(dto);
                }
            }

            Long ret = lectureService.registLecture(files, lectureVO, lsrDtos);
            return new ResponseEntity<>("강의 개설 성공\n강의 번호 : " + ret, HttpStatus.OK);
//            return new ResponseEntity<>("OK!!!", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("강의 개설 오류", HttpStatus.INTERNAL_SERVER_ERROR);
        }

//        return null;
    }

    @GetMapping
    public ResponseEntity<?> searchLectureByName(@RequestParam("search") String name) throws Exception {
        List<LectureResponseDTO> resultList = lectureService.searchLectureByName(name);
        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }

    @GetMapping("/{lectureId}")
    public ResponseEntity<LectureResponseDTO> getLectureById(@PathVariable long lectureId) throws Exception {
        LectureResponseDTO lectureResponseDTO = lectureService.getLectureById(lectureId);

        return ResponseEntity.status(HttpStatus.OK).body(lectureResponseDTO);
    }

    @PostMapping("/{lectureId}/updateActive")
    public ResponseEntity<LectureResponseDTO> updateLectureActive(@PathVariable long lectureId, @RequestBody LectureUpdateActiveRequestDTO lectureRequestDTO) throws Exception {

        //토큰 userID와 DTO userID 같은지 검증 추가


        LectureResponseDTO lectureResponseDTO = lectureService.updateLectureActive(lectureId, lectureRequestDTO.getUserId(), lectureRequestDTO.isActive());

        return ResponseEntity.status(HttpStatus.OK).body(lectureResponseDTO);
    }

    @GetMapping("/yoga/{yogaId}")
    public ResponseEntity<?> searchLectureByNameAndYoga(@PathVariable long yogaId, @RequestParam("search") String name) throws Exception {
        List<LectureResponseDTO> resultList = lectureService.searchLectureByNameAndYoga(name, yogaId);
        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }

    @GetMapping("/review")
    public ResponseEntity<?> getReviewByUserIdAndLectureId(@RequestParam("userId") long userId) {
        List<LectureReviewResponseDTO> resultList = lectureService.getReviewsByUserId(userId);
        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }

    @PostMapping("/review")
    public ResponseEntity<?> registReview(@RequestBody LectureReviewRequestDTO userRequestDto) throws Exception {
        try {
            lectureService.registReview(userRequestDto);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
}

