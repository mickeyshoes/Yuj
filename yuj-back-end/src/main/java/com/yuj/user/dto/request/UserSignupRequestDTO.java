package com.yuj.user.dto.request;

import com.yuj.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Collections;

/**
 * 회원가입 요청 보내는 RequestDto
 */

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserSignupRequestDTO {
    private String id;
    private String password;
    private String name;
    private String nickname;
    private String phone;
    private String email;
    private LocalDate birthDate;
    private String gender;
    private String profileImagePath;
    private String role;

    public User toEntity(PasswordEncoder passwordEncoder) {
        return User.builder()
                .id(id)
                .password(passwordEncoder.encode(password))
                .name(name)
                .nickname(nickname)
                .phone(phone)
                .email(email)
                .birthDate(birthDate)
                .gender(gender)
                .profileImagePath(profileImagePath)
                .roles(Collections.singletonList(role))
                .build();
    }

    public void setProfileImagePath(String profileImagePath) {
        this.profileImagePath = profileImagePath;
    }
}
