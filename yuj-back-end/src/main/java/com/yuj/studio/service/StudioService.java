package com.yuj.studio.service;

import com.yuj.exception.CStudioNotFoundException;
import com.yuj.exception.CUserNotFoundException;
import com.yuj.lecture.domain.Lecture;
import com.yuj.lecture.domain.UserLecture;
import com.yuj.lecture.repository.LectureRepository;
import com.yuj.lecture.repository.UserLectureRepository;
import com.yuj.lectureimage.domain.ImageFile;
import com.yuj.lectureimage.handler.FileHandler;
import com.yuj.studio.domain.Studio;
import com.yuj.studio.dto.response.StudioResponseDTO;
import com.yuj.studio.repository.StudioRepository;
import com.yuj.user.domain.User;
import com.yuj.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudioService {
    private final UserRepository userRepository;
    private final StudioRepository studioRepository;
    private final LectureRepository lectureRepository;
    private final UserLectureRepository userLectureRepository;
    private final FileHandler fileHandler;

    @Transactional
    public Long createStudio(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(CUserNotFoundException::new);
        Studio studio = Studio.builder()
                .bannerImage("Sample4.jpg") // 스튜디오 배너 기본 이미지
                .description(user.getNickname() + "님의 스튜디오입니다.")
                .build();

        user.setStudio(studio);
        studio.setUser(user);

        return studioRepository.save(studio).getStudioId();
    }

    @Transactional
    public String updateStudio(Long userId, List<MultipartFile> files, String description) {
        User user = userRepository.findById(userId).orElseThrow(CUserNotFoundException::new);
        Studio studio = user.getStudio();
        String ret = "";

        studio.setDescription(description);
        try {
            List<ImageFile> imageFileList = fileHandler.parseLectureImageInfo(files);

            //  파일이 존재하면 처리
            if(!imageFileList.isEmpty()) {
                ImageFile imageFile = imageFileList.get(0);
                studio.setBannerImage(imageFile.getFilePath());
            }
            
            ret = "Studio " + studio.getStudioId() + " 수정 성공";
        } catch(Exception e) {
            e.printStackTrace();
            ret = "Studio " + studio.getStudioId() + " 수정 실패";
        } finally {
            return ret;
        }
    }

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
        float rating = user.getRatingCnt() == 0 ? 3 : (float) user.getRatingSum() / user.getRatingCnt();
        return StudioResponseDTO.builder()
                .studioId(studio.getStudioId())
                .description(studio.getDescription())
                .bannerImage(studio.getBannerImage())
                .userId(user.getUserId())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .rating(rating)
                .profileImagePath(user.getProfileImagePath())
                .build();
    }
}
