package com.yuj.user.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

/**
 * id로 회원 상세 정보 받아오는 DTO
 */

@Getter
@Setter
@Builder
public class TeacherResponseDTO {
    private String id;
    private String name;
    private String nickname;
    private String phone;
    private String email;
    private LocalDate birthDate;
    private String gender;
    private String profileImage;
    private boolean isTeacher;
    private float rating;
    private String description;
    private long userId;

}
