package com.yuj.lecture.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class LectureReviewRequestDTO {
	private String review;
	private Integer score;
	private long lectureId;
	private long userId;
	private long teacherId;
}
