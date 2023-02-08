package com.yuj.controller;

import com.yuj.studio.controller.StudioController;
import com.yuj.studio.dto.response.StudioResponseDTO;
import com.yuj.studio.service.StudioServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(StudioController.class)
public class StudioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    StudioServiceImpl studioService;

    @Test
    @DisplayName("강사 userId로 Studio를 조회하는 테스트")
    void getStudioTest() throws Exception {
        given(studioService.getStudio(0L)).willReturn(
                StudioResponseDTO.builder()
                        .studioId(0L)
                        .bannerImage("./banner1.jpg")
                        .description("※ 구독자분들과 함께 요가수련하는 요가 안내자입니다.※ 비즈니스 문의 | yogaboyofficial@gmail.com※ 하루10분, 요가로 찾은 내 몸의 선 | 클래스101 | https://101creator.page.link/eW3k※ 건강한 다이어트, 하루 30분 요가 챌린지 | 클래스유 | https://me2.do/GRAbFITs")
                        .build()
        );

        String userId = "0";

        mockMvc.perform(get("/studio/"+userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.studioId").exists())
                .andExpect(jsonPath("$.bannerImage").exists())
                .andExpect(jsonPath("$.description").exists())
                .andDo(print());

        verify(studioService).getStudio(0L);
    }
}
