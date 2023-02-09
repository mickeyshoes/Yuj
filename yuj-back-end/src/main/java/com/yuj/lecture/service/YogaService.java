package com.yuj.lecture.service;

import com.yuj.lecture.domain.Yoga;
import com.yuj.lecture.dto.response.YogaResponseDTO;
import com.yuj.lecture.repository.YogaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class YogaService {

    private final YogaRepository yogaRepository;

    public List<YogaResponseDTO> getYogaList() throws Exception {
        List<Yoga> list = yogaRepository.findAll();
        List<YogaResponseDTO> returnList = new ArrayList<>();

        for(Yoga yoga: list) {
            returnList.add(entityToYogaDTO(yoga));
        }

        return returnList;
    }

    public YogaResponseDTO entityToYogaDTO(Yoga yoga) {
        return YogaResponseDTO.builder()
                .yogaId(yoga.getYogaId())
                .name(yoga.getName())
                .englishName(yoga.getEnglishName())
                .description(yoga.getDescription())
                .build();
    }
}
