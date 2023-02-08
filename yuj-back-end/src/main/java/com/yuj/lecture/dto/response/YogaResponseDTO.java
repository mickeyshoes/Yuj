package com.yuj.lecture.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class YogaResponseDTO {
    private Long yogaId;

    private String name;

    private String description;

    private String englishName;
}
