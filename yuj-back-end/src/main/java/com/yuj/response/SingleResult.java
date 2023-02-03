package com.yuj.response;

import lombok.Getter;
import lombok.Setter;
/**
 * 단일 응답 모델
 * API 반환값이 단일 객체일 경우 해당 모델로 처리
 * 공통 응답 모델을 상속받아서 API 응답 관련 정보도 포함
 * 여러 Entity에 적용 가능
 */

@Getter
@Setter
public class SingleResult<T> extends CommonResult {
    private T data;
}