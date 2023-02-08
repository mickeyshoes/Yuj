package com.yuj.service;

import com.yuj.lecture.repository.LectureRepository;
import com.yuj.lecture.service.LectureServiceImpl;
import com.yuj.studio.domain.Studio;
import com.yuj.studio.dto.response.StudioResponseDTO;
import com.yuj.studio.repository.StudioRepository;
import com.yuj.studio.service.StudioServiceImpl;
import com.yuj.user.domain.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import java.util.Optional;

import static org.mockito.Mockito.verify;

public class StudioServiceTest {
    private StudioRepository studioRepository = Mockito.mock(StudioRepository.class);
    private LectureRepository lectureRepository = Mockito.mock(LectureRepository.class);
    private StudioServiceImpl studioService;
    private LectureServiceImpl lectureService;

    @BeforeEach
    void setUpTest() {
        studioService = new StudioServiceImpl(studioRepository);
        lectureService = new LectureServiceImpl(lectureRepository);
    }

    @Test
    void getStudioTest() throws Exception {
        Studio givenStudio = Studio.builder()
                .studioId(0L)
                .bannerImage("./banner1.jpg")
                .description("※ 구독자분들과 함께 요가수련하는 요가 안내자입니다.※ 비즈니스 문의 | yogaboyofficial@gmail.com※ 하루10분, 요가로 찾은 내 몸의 선 | 클래스101 | https://101creator.page.link/eW3k※ 건강한 다이어트, 하루 30분 요가 챌린지 | 클래스유 | https://me2.do/GRAbFITs")
                .user(new User())
                .build();

        Mockito.when(studioRepository.findByUser_UserId(0L))
                .thenReturn(Optional.of(givenStudio));

        StudioResponseDTO studioResponseDTO = studioService.getStudioByUserId(0L);

        Assertions.assertEquals(studioResponseDTO.getStudioId(), givenStudio.getStudioId());
        Assertions.assertEquals(studioResponseDTO.getBannerImage(), givenStudio.getBannerImage());
        Assertions.assertEquals(studioResponseDTO.getDescription(), givenStudio.getDescription());

        verify(studioRepository).findByUser_UserId(0L);
    }

//    @Test
//    void getLecturesByUserId() throws Exception {
//
//    }
}
