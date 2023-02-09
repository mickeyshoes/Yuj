package com.yuj.lecture.controller;

import com.yuj.lecture.dto.response.YogaResponseDTO;
import com.yuj.lecture.service.YogaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/yoga")
@RequiredArgsConstructor
public class YogaController {

    private final YogaService yogaService;

    @GetMapping("/list")
    public ResponseEntity<List<YogaResponseDTO>> getYogaList() throws Exception {
        log.info("getYogaList controller");
        List<YogaResponseDTO> list = yogaService.getYogaList();

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

}
