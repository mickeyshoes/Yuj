package com.yuj.studio.service;

import com.yuj.studio.dto.response.StudioResponseDTO;

public interface StudioService {

    StudioResponseDTO getStudio(Long studioId) throws Exception;
    StudioResponseDTO getStudioByUserId(Long userId) throws Exception;

}
