package com.yuj.studio.service;

import com.yuj.studio.domain.Studio;
import com.yuj.studio.dto.response.StudioResponseDTO;
import com.yuj.studio.repository.StudioRepository;
import com.yuj.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudioService {

    private final StudioRepository studioRepository;

    public StudioResponseDTO getStudio(Long studioId) throws Exception {
        Studio studio = studioRepository.findById(studioId).orElseThrow(() -> new Exception("스튜디오가 존재하지 않습니다."));

        return entityToResponseDTO(studio);
    }

    public StudioResponseDTO getStudioByUserId(Long userId) throws Exception {
        Studio studio =  studioRepository.findByUser_UserId(userId).orElseThrow(() -> new Exception("스튜디오가 존재하지 않습니다."));

        return entityToResponseDTO(studio);
    }

    private StudioResponseDTO entityToResponseDTO(Studio studio) {
        User user = studio.getUser();
        return StudioResponseDTO.builder()
                .studioId(studio.getStudioId())
                .description(studio.getDescription())
                .bannerImage(studio.getBannerImage())
                .userId(user.getUserId())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .profileImagePath(user.getProfileImagePath())
                .build();
    }
}
