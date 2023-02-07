package com.yuj.user.dto.request;

import lombok.*;

/**
 * Token 재발급을 위한 request dto
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TokenRequestDTO {
    private String accessToken;
    private String refreshToken;
}
