package com.yuj.lecture.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yuj.lecture.dto.request.LectureVO;
import com.yuj.lecture.dto.request.LectureUpdateActiveRequestDTO;
import com.yuj.lecture.dto.response.LectureResponseDTO;
import com.yuj.lecture.service.LectureService;
import com.yuj.lectureimage.handler.FileHandler;
import com.yuj.lectureimage.service.LectureImageService;

import com.yuj.user.service.UserService;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/lectures")
@RequiredArgsConstructor
public class LectureController {

    private final LectureService lectureService;
    private final UserService userService;
    private final LectureImageService lectureImageService;

    private final FileHandler fileHandler;

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> registLecture(@RequestPart(value="files") List<MultipartFile> files, @RequestParam(value = "vo")String lectureImageVO) {
        System.out.println("registLecture in Lecture Controller");
        System.out.println("files = " + files);
        System.out.println(" lectureImageVO = " + lectureImageVO);

        try {
            JSONParser jsonParser = new JSONParser(lectureImageVO);
            Object obj = jsonParser.parse();
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> map = mapper.convertValue(obj, Map.class);
            System.out.println("obj = " + obj);

            for(String key : map.keySet()) {
                System.out.println(key + " : " + String.valueOf(map.get(key)));
            }
            LectureVO lectureVO1 = LectureVO.builder()
                    .userId(Long.parseLong(String.valueOf(map.get("userId"))))
                    .yogaId(Long.parseLong(String.valueOf(map.get("yogaId"))))
                    .name(String.valueOf(map.get("name")))
                    .description(String.valueOf(map.get("description")))
                    .startDate(LocalDate.parse(String.valueOf(map.get("startDate")), DateTimeFormatter.ISO_DATE))
                    .endDate(LocalDate.parse(String.valueOf(map.get("endDate")), DateTimeFormatter.ISO_DATE))
                    .limitStudents(Integer.parseInt(String.valueOf(map.get("limitStudents"))))
                    .fee(Integer.parseInt(String.valueOf(map.get("fee"))))
                    .totalCount(Integer.parseInt(String.valueOf(map.get("totalCount"))))
                    .build();

            System.out.println("VO = " + lectureVO1);

            Long ret = lectureService.registLecture(files, lectureVO1);
            if(ret == -1)
            return new ResponseEntity<>(ret, HttpStatus.INTERNAL_SERVER_ERROR);

        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(-1, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(1, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> searchLectureByName(@RequestParam("search") String name) throws Exception{
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
}
