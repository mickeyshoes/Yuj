package com.yuj.lecture.service;

import com.yuj.exception.CUserNotFoundException;
import com.yuj.exception.controller.CYogaNotFoundException;
import com.yuj.lecture.domain.Lecture;
import com.yuj.lecture.domain.Yoga;
import com.yuj.lecture.dto.request.LectureVO;
import com.yuj.lecture.dto.response.LectureResponseDTO;
import com.yuj.lecture.repository.LectureRepository;
import com.yuj.lecture.repository.YogaRepository;
import com.yuj.lectureimage.domain.ImageFile;
import com.yuj.lectureimage.handler.FileHandler;
import com.yuj.lectureimage.repository.LectureImageRepository;
import com.yuj.user.domain.User;
import com.yuj.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class LectureService {

    private final LectureRepository lectureRepository;
    private final LectureImageRepository lectureImageRepository;
    private final YogaRepository yogaRepository;

    private final UserRepository userRepository;    //  강의 등록 때 pk로 강사 찾아야 함

    private final FileHandler fileHandler;

    public Long registLecture(List<MultipartFile> files, LectureVO lectureVO) {
        //  강사 Entity 찾아내기
        log.info("in registLecture");
        User teacher = userRepository.findById(lectureVO.getUserId()).orElseThrow(CUserNotFoundException::new);
        Yoga yoga = yogaRepository.findById(lectureVO.getYogaId()).orElseThrow(CYogaNotFoundException::new);

        log.info("teacher = " + teacher);
        
        Lecture lecture = Lecture.builder()
                .user(teacher)
                .yoga(yoga)
                .name(lectureVO.getName())
                .description(lectureVO.getDescription())
                .registDate(lectureVO.getRegistDate())
                .startDate(lectureVO.getStartDate())
                .endDate(lectureVO.getEndDate())
                .limitStudents(lectureVO.getLimitStudents())
                .fee(lectureVO.getFee())
                .totalCount(lectureVO.getTotalCount())
                .build();

        log.info("before");
        log.info("lecture = " + lecture);
        log.info("after");

        Long ret = -1L;

        try {
            List<ImageFile> imageFileList = fileHandler.parseLectureImageInfo(files);

            ret = lectureRepository.save(lecture).getLectureId();

            //  파일이 존재하면 처리
            if(!imageFileList.isEmpty()) {
                for(ImageFile imageFile : imageFileList) {
                    //  파일을 DB에 저장
                    imageFile.setLecture(lecture);
                    lecture.addLectureImage(lectureImageRepository.save(imageFile));
                }
            }
        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            return ret;
        }
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
        List<Lecture> lectures = lectureRepository.findByUser_UserIdAndIsActiveTrue(userId).orElseThrow(() -> new Exception("수업이 존재하지 않습니다."));

        return entityToResponseDTO(lectures.get(0));
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
