package com.yuj.user.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Token 재발급을 위한 request dto
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TokenRequestDTO {
    private String accessToken;
    private String refreshToken;
}
