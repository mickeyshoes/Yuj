<<<<<<< HEAD
//package com.yuj.service;
=======
package com.yuj.service;

import com.yuj.lecture.repository.LectureRepository;
import com.yuj.lecture.repository.UserLectureRepository;
import com.yuj.lecture.service.LectureService;
import com.yuj.studio.domain.Studio;
import com.yuj.studio.dto.response.StudioResponseDTO;
import com.yuj.studio.repository.StudioRepository;
import com.yuj.studio.service.StudioService;
import com.yuj.user.domain.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Optional;

import static org.mockito.Mockito.verify;

public class StudioServiceTest {
    private StudioRepository studioRepository = Mockito.mock(StudioRepository.class);
    private LectureRepository lectureRepository = Mockito.mock(LectureRepository.class);
    private UserLectureRepository userLectureRepository = Mockito.mock(UserLectureRepository.class);
    private StudioService studioService;
    private LectureService lectureService;

    @BeforeEach
    void setUpTest() {
        studioService = new StudioService(studioRepository, lectureRepository, userLectureRepository);
        lectureService = new LectureService(lectureRepository);
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
>>>>>>> cea6158a32384a3714344e1da2fb41cc22c50f75
//
//import com.yuj.lecture.repository.LectureRepository;
//import com.yuj.lecture.service.LectureService;
//import com.yuj.studio.domain.Studio;
//import com.yuj.studio.dto.response.StudioResponseDTO;
//import com.yuj.studio.repository.StudioRepository;
//import com.yuj.studio.service.StudioService;
//import com.yuj.user.domain.User;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//
//import java.util.Optional;
//
//import static org.mockito.Mockito.verify;
//
//public class StudioServiceTest {
//    private StudioRepository studioRepository = Mockito.mock(StudioRepository.class);
//    private LectureRepository lectureRepository = Mockito.mock(LectureRepository.class);
//
//    private StudioService studioService;
//    private LectureService lectureService;
//
//    @BeforeEach
//    void setUpTest() {
//        studioService = new StudioService(studioRepository);
//        lectureService = new LectureService(lectureRepository);
//    }
//
//    @Test
//    void getStudioTest() throws Exception {
//        Studio givenStudio = Studio.builder()
//                .studioId(0L)
//                .bannerImage("./banner1.jpg")
//                .description("※ 구독자분들과 함께 요가수련하는 요가 안내자입니다.※ 비즈니스 문의 | yogaboyofficial@gmail.com※ 하루10분, 요가로 찾은 내 몸의 선 | 클래스101 | https://101creator.page.link/eW3k※ 건강한 다이어트, 하루 30분 요가 챌린지 | 클래스유 | https://me2.do/GRAbFITs")
//                .user(new User())
//                .build();
//
//        Mockito.when(studioRepository.findByUser_UserId(0L))
//                .thenReturn(Optional.of(givenStudio));
//
//        StudioResponseDTO studioResponseDTO = studioService.getStudioByUserId(0L);
//
//        Assertions.assertEquals(studioResponseDTO.getStudioId(), givenStudio.getStudioId());
//        Assertions.assertEquals(studioResponseDTO.getBannerImage(), givenStudio.getBannerImage());
//        Assertions.assertEquals(studioResponseDTO.getDescription(), givenStudio.getDescription());
//
//        verify(studioRepository).findByUser_UserId(0L);
//    }
//
////    @Test
////    void getLecturesByUserId() throws Exception {
////
////    }
//}
