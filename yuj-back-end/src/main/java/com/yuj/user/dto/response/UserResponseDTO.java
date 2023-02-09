package com.yuj.user.dto.response;

import com.yuj.user.domain.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * id로 회원 상세 정보 받아오는 DTO
 */

@Getter
@Builder
public class UserResponseDTO {
    private String id;
    private String name;
    private String nickname;
    private String phone;
    private String email;
    private LocalDate birthDate;
    private String gender;
    private String profileImage;
    private boolean isTeacher;

}
