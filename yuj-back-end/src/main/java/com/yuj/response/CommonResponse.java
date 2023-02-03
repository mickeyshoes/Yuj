package com.yuj.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 *  공통 응답 코드, 메시지
 */

@Getter
@AllArgsConstructor
public enum CommonResponse {
    SUCCESS(0, "성공하였습니다."),
    FAIL(-1, "실패하였습니다.");

    private int code;
    private String msg;
}
