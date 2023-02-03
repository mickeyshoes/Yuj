package com.yuj.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 *  다중 응답 모델
 *  API 반환값이 다중 객체일 경우 해당 모델로 처리
 */

@Getter
@Setter
public class ListResult<T> extends  CommonResult {
    private List<T> data;
}
