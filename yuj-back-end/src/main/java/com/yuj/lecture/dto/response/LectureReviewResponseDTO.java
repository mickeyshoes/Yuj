package com.yuj.lecture.dto.response;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LectureReviewResponseDTO {
	private long reviewId;
	private long userId;
	private String userName;
	private LocalDate date;
	private double rating;
	private String lectureName;
	private String review;
	private String profileImage;
}
