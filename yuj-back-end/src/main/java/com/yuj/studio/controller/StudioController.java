package com.yuj.studio.controller;

import com.yuj.studio.dto.response.StudioResponseDTO;
import com.yuj.studio.service.StudioService;
import com.yuj.studio.service.StudioServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/studio")
public class StudioController {

    private final StudioService studioService;

    @Autowired
    public StudioController(StudioService studioService) {
        this.studioService = studioService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<StudioResponseDTO> getStudio(@PathVariable Long userId) throws Exception {

        log.info("getStudio controller");
        log.info("userId : {}",userId);
        StudioResponseDTO studioResponseDTO = studioService.getStudioByUserId(userId);

        return ResponseEntity.status(HttpStatus.OK).body(studioResponseDTO);
    }
}
