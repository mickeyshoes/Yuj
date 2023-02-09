package com.yuj.mypage.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyPageResponseDTO {
    //결과코드, 결과메세지, 데이터,응답
    //lecture테이블, lectureschedule 테이블강의 이름, 시작 시간, 끝 시간, 강의하는날 day
    //user, user_lecture,_schedule

    private Long userId;
    private String profileImage;
    private String nickname;
    private String password;
    private String phone;
    private String email;
}
