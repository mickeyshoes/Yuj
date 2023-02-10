package com.yuj.lecture.service;

import com.yuj.exception.CUserNotFoundException;
import com.yuj.lecture.domain.Lecture;
import com.yuj.lecture.dto.request.LectureImageVO;
import com.yuj.lecture.dto.request.LectureRegistRequestDTO;
import com.yuj.lecture.dto.response.LectureResponseDTO;
import com.yuj.lecture.repository.LectureRepository;
import com.yuj.lectureimage.domain.LectureImage;
import com.yuj.lectureimage.handler.FileHandler;
import com.yuj.lectureimage.repository.LectureImageRepository;
import com.yuj.user.domain.User;
import com.yuj.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LectureService {

    private final LectureRepository lectureRepository;
    private final LectureImageRepository lectureImageRepository;

    private final UserRepository userRepository;    //  강의 등록 때 pk로 강사 찾아야 함

    private final FileHandler fileHandler;

    public Long registLecture(LectureImageVO lectureImageVO) {
        //  강사 Entity 찾아내기
        User teacher = userRepository.findById(lectureImageVO.getUserId()).orElseThrow(CUserNotFoundException::new);
        Lecture lecture = Lecture.builder()
                .user(teacher)
                .name(lectureImageVO.getName())
                .description(lectureImageVO.getDescription())
                .registDate(lectureImageVO.getRegistDate())
                .startDate(lectureImageVO.getStartDate())
                .endDate(lectureImageVO.getEndDate())
                .limitStudents(lectureImageVO.getLimitStudents())
                .fee(lectureImageVO.getFee())
                .totalCount(lectureImageVO.getTotalCount())
                .build();

        System.out.println("before");
        System.out.println("lecture = " + lecture);
        System.out.println("after");

        try {
            List<LectureImage> lectureImageList = fileHandler.parseLectureImageInfo(lectureImageVO.getFiles());

            //  파일이 존재하면 처리
            if(!lectureImageList.isEmpty()) {
                for(LectureImage lectureImage : lectureImageList) {
                    //  파일을 DB에 저장
                    lecture.addLectureImage(lectureImageRepository.save(lectureImage));
                }
            }
        } catch(Exception e) {
            e.printStackTrace();
//            return -1L;
        }

        Long ret = lectureRepository.save(lecture).getLectureId();

//        System.out.println("lectureRepository = " + lectureRepository.findAll());
        return ret;
    }


    public LectureResponseDTO getLectureById(Long lectureId) throws Exception {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(() -> new Exception("수업이 존재하지 않습니다."));

        return entityToResponseDTO(lecture);
    }


    public List<LectureResponseDTO> getLecturesByUserId(Long userId) throws Exception {
        List<Lecture> Lecturelist = lectureRepository.findLectureByUserId(userId, LocalDate.now());
        List<Lecture> LectureEndlist = lectureRepository.findLectureEndByUserId(userId, LocalDate.now());

        List<LectureResponseDTO> returnList = new ArrayList<>();

        for(Lecture lecture : Lecturelist) {
            returnList.add(entityToResponseDTO(lecture));
        }
        for(Lecture lecture : LectureEndlist) {
            returnList.add(entityToResponseDTO(lecture));
        }

        return returnList;
    }

    public LectureResponseDTO updateLectureActive(Long lectureId, long userId, Boolean isActive) throws Exception {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(() -> new Exception("강의가 존재하지 않습니다."));

        if(lecture.getUser().getUserId() != userId) {
            throw new Exception("해당 수업의 강사가 아닙니다.");
        }else{
            lecture.setActive(isActive);

            Lecture updatedLecture = lectureRepository.save(lecture);
            return entityToResponseDTO(updatedLecture);
        }
    }

    public LectureResponseDTO getActiveLectureByUserId(Long userId) throws Exception {
        Lecture lecture = lectureRepository.findByUser_UserIdAndIsActiveTrue(userId).orElseThrow(() -> new Exception("수업이 존재하지 않습니다."));

        return entityToResponseDTO(lecture);
    }
    
    public List<LectureResponseDTO> searchLectureByName(String name) throws Exception{
    	List<LectureResponseDTO> result = new ArrayList<>();
    	LocalDate threshold = LocalDate.now();
    	
    	// 현재 진행하고 있는 강의 검색
    	List<Lecture> list = lectureRepository.findLecture(name, threshold);
    	
    	// 현재 종료된 강의 검색
    	List<Lecture> list2 = lectureRepository.findLectureEnd(name, threshold);
    	
    	for (Lecture lecture : list) {
			result.add(entityToResponseDTO(lecture));
		}
    	
    	for (Lecture lecture : list2) {
    		result.add(entityToResponseDTO(lecture));
		}
    	return result;
    }

    private LectureResponseDTO entityToResponseDTO(Lecture lecture) {
        User user = lecture.getUser();
        return LectureResponseDTO.builder()
                .fee(lecture.getFee())
                .lectureId(lecture.getLectureId())
                .description(lecture.getDescription())
                .endDate(lecture.getEndDate())
                .limitStudents(lecture.getLimitStudents())
                .name(lecture.getName())
                .registDate(lecture.getRegistDate())
                .startDate(lecture.getStartDate())
                .thumbnailImage(lecture.getThumbnailImage())
                .totalCount(lecture.getTotalCount())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .profileImagePath(user.getProfileImagePath())
                .yoga(lecture.getYoga())
                .isActive(lecture.isActive())
                .build();
    }
}
