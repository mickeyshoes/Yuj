package com.yuj.studio.dto.response;

import com.yuj.user.domain.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StudioResponseDTO {
    private Long studioId;
    private String bannerImage;
    private String description;
}
