package com.yuj.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 공통 응답 모델
 * 전달될 데이터와 별개로 API의 처리 여부, 상태 메시지가 담긴 메시지
 * 다른 모든 응답이 이 응답을 상속받음
 */

@Getter
@Setter
public class CommonResult {
    @ApiModelProperty(value = "응답 성공 여부 : T/F")
    private boolean success;

    @ApiModelProperty(value = "응답 코드 : >= 0 정상, < 0 비정상")
    private int code;

    @ApiModelProperty(value = "응답 메시지")
    private String msg;
}
