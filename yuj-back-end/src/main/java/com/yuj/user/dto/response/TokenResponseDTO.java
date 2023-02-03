package com.yuj.user.dto.response;

import lombok.*;

/**
 * 토큰 (재)발행, 로그인 완료 response dto
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TokenResponseDTO {
    private String grantType;
    private String accessToken;
    private String refreshToken;
    private Long accessTokenExpireDate;
}
