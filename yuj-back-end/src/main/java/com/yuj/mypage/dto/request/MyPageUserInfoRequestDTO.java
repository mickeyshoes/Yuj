package com.yuj.mypage.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyPageUserInfoRequestDTO {
    //사진, 닉네임, 비밀번호 등등 업데이트용 DTO

    private Long userId;
    private String profileImage;
    private String nickname;
    private String password;
    private String phone;
    private String email;
}
