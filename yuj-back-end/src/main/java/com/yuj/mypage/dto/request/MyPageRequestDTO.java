package com.yuj.mypage.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyPageRequestDTO {
    //사진, 닉네임, 비밀번호 등등 업데이트용 DTO 필요
    //매개변수 로그인한 사용자 id key값 현재 유저정보, 수강목록조회등 사용 게터세터

    private Long userId;
    private String profileImage;
    private String nickname;
    private String password;
    private String phone;
    private String email;
}
