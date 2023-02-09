package com.yuj.lecture.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LectureUpdateActiveRequestDTO {
    private long userId;
    private boolean isActive;
}
