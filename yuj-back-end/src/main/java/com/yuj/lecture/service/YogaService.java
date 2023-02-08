package com.yuj.lecture.service;

import com.yuj.lecture.domain.Yoga;
import com.yuj.lecture.dto.request.YogaRequestDTO;
import com.yuj.lecture.dto.response.YogaResponseDTO;
import com.yuj.lecture.repository.YogaRepository;
import com.yuj.response.ListResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class YogaService {

    private final YogaRepository yogaRepository;

    public List<Yoga> getYogaInfo() {
        return yogaRepository.findAll();
    }

}
