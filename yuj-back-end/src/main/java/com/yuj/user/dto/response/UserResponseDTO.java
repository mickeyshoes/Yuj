package com.yuj.user.dto.response;

import com.yuj.user.domain.User;
import lombok.Getter;

import java.time.LocalDate;

/**
 * id로 회원 상세 정보 받아오는 DTO
 */

@Getter
public class UserResponseDTO {
    private String id;
    private String name;
    private String nickname;
    private String phone;
    private String email;
    private LocalDate birthDate;
    private String gender;
    private String profileImage;
    private String role;

    public UserResponseDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.nickname = user.getNickname();
        this.phone = user.getPhone();
        this.email = user.getEmail();
        this.birthDate = user.getBirthDate();
        this.gender = user.getGender();
        this.profileImage = user.getProfileImagePath();
        this.role = user.getRoles().get(0);
    }
}
