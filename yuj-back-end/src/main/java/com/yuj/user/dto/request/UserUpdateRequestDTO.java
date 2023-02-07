package com.yuj.user.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUpdateRequestDTO {
//    password: “1234”,
//    username: “최싸피”,
//    nickname:  “싸피2”,
//    phone: “010-1111-1111”,
//    email: “ssafy2@naver.com”,
//    profile_image: “”
    private String password;
    private String name;
    private String nickname;
    private String phone;
    private String email;
    private String profileImagePath;
}
