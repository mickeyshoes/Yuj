package com.yuj.user.dto.request;

import com.yuj.user.domain.User;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

/**
 * 회원가입 요청 보내는 RequestDto
 */

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
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
    private String roleName;

    public User toEntity(PasswordEncoder passwordEncoder) {
//        Role role = this.role.equals("ROLE_USER") ? Role.USER : (this.role.equals("ROLE_TEACHER") ? Role.TEACHER : Role.ADMIN);
        boolean isTeacher = false;

        if(roleName.equals("ROLE_TEACHER"))
            isTeacher = true;

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
//                .roles(Collections.singletonList(role))
                .roleName(roleName)
                .isTeacher(isTeacher)
                .build();
    }

    public void setProfileImagePath(String profileImagePath) {
        this.profileImagePath = profileImagePath;
    }
}
