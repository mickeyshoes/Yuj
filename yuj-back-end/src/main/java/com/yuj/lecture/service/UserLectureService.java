package com.yuj.lecture.service;

import com.yuj.exception.CLectureNotFoundException;
import com.yuj.exception.CUserLectureNotFoundException;
import com.yuj.exception.CUserNotFoundException;
import com.yuj.lecture.domain.Lecture;
import com.yuj.lecture.domain.UserLecture;
import com.yuj.lecture.dto.request.LectureReviewRequestDTO;
import com.yuj.lecture.dto.response.LectureReviewResponseDTO;
import com.yuj.lecture.dto.response.UserLectureResponseDTO;
import com.yuj.lecture.repository.LectureRepository;
import com.yuj.lecture.repository.UserLectureRepository;
import com.yuj.user.domain.User;
import com.yuj.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserLectureService {
    private final UserLectureRepository userLectureRepository;
    private final LectureRepository lectureRepository;
    private final UserRepository userRepository;

    //유저 렉처 수강 및 재수강
    @Transactional
    public Long registUserLecture(Long userId, Long lectureId) throws Exception {
        log.info("registUserLecture controller start");

        UserLecture userLecture;
        // 강의, 유저 Entity 찾기
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(CLectureNotFoundException::new);
        User user = userRepository.findById(userId).orElseThrow(CUserNotFoundException::new);
        try {
            userLecture = userLectureRepository.findByUser_UserIdAndLecture_LectureId(userId, lectureId).orElseThrow(CUserLectureNotFoundException::new);
        } catch (CUserLectureNotFoundException e) {
            userLecture = null;
        }

        Long ret = -1L;

        // 유저가 수강 혹은 재수강 시 lecture의 현재 total_count++, 만약 그 결과가 limit_students를 넘으면 등록 X.
        if (lecture.getTotalCount() == lecture.getLimitStudents()) return ret;
        // 유저 수강 내역이 존재하는지 아닌지 검사
        if (userLecture != null) {
            if (userLecture.isState()) {
                log.info("이미 수강 중");
                return ret;
            } else {
                log.info("재수강");

                //재수강
                ret = userLecture.getUserLectureId();
                userLecture.setState(!userLecture.isState());
                lecture.setTotalCount(lecture.getTotalCount() + 1);
                return ret;
            }
        }

        log.info("초수강");
        // 유저 수강 내역이 없는 경우
        UserLecture newUserLecture = UserLecture.builder()
                .lecture(lecture)
                .user(user)
                .registDate(LocalDate.now())
                .build();

        log.info("newUserLecture = " + newUserLecture);
        log.info("lecture = " + lecture);
        log.info("user = " + user);

        lecture.setTotalCount(lecture.getTotalCount() + 1);

        ret = userLectureRepository.save(newUserLecture).getUserLectureId();

        return ret;
    }

    // 유저 렉처 상태 변경(수강 취소)
    @Transactional
    public Long deleteUserLecture(Long userId, Long lectureId) throws Exception {
        Long ret = -1L;
        // 유저렉처 찾아오기
        UserLecture userLecture = userLectureRepository.findByUser_UserIdAndLecture_LectureId(userId, lectureId).orElseThrow(Exception::new);
        // 수강 중 상태 확인 후 수정
        if (!userLecture.isState()) return ret;
        userLecture.setState(!userLecture.isState());
        // total_count--
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(Exception::new);
        lecture.setTotalCount(lecture.getTotalCount() - 1);
        // 저장
        userLectureRepository.save(userLecture);
        ret = userLecture.getUserLectureId();
        return ret;
    }

    //유저 렉처 검색
    public UserLectureResponseDTO getUserLecture(Long userId, Long lectureId) throws Exception {
        UserLecture userLecture = userLectureRepository.findByUser_UserIdAndLecture_LectureId(userId, lectureId).orElseThrow(Exception::new);

        return entityToResponseDTO(userLecture);
    }

    public UserLectureResponseDTO entityToResponseDTO(UserLecture userLecture) {
        User user = userLecture.getUser();
        Lecture lecture = userLecture.getLecture();
        return UserLectureResponseDTO.builder()
                .userLectureId(userLecture.getUserLectureId())
                .registDate(userLecture.getRegistDate())
                .score(userLecture.getScore())
                .review(userLecture.getReview())
                .reviewUpdateDate(userLecture.getReviewUpdateDate())
                .userId(user.getUserId())
                .lectureId(lecture.getLectureId())
                .state(userLecture.isState())
                .build();
    }

    /*  ** 수강 후기 관련 ** */

    // 유저 수강 후기 리스트 
    public List<LectureReviewResponseDTO> getReviewsByUserId(Long userId) {
		List<LectureReviewResponseDTO> result = new ArrayList<>();
		List<UserLecture> list = userLectureRepository.getReviewsByUserId(userId);
		
		for (UserLecture userLecture : list) {
			result.add(entityToReviewDTO(userLecture));
		}
		return result;
	}
    
    // 유저 수강 후기 등록
    public void registReview(LectureReviewRequestDTO userRequestDto) {
        UserLecture selectedUserLecture = userLectureRepository.findByUser_UserIdAndLecture_LectureId(userRequestDto.getUserId(), userRequestDto.getLectureId()).orElseThrow(CUserLectureNotFoundException::new);

        // 수강신청 내역에 리뷰관련 내용 추가하기
        selectedUserLecture.setReview(userRequestDto.getReview());
        selectedUserLecture.setReviewUpdateDate(LocalDateTime.now());
        selectedUserLecture.setScore(userRequestDto.getScore());

        // 후기에 따른 강사 댓글 개수, 점수 합계 update
		User teacher = userRepository.findById(userRequestDto.getTeacherId()).orElseThrow(CUserNotFoundException::new);
		
		teacher.setRatingCnt(teacher.getRatingCnt() + 1);
		teacher.setRatingSum(teacher.getRatingSum() + userRequestDto.getScore());
	}
	
    // 유저 수강 후기 삭제
    public void deleteReview(Long userLectureId) throws Exception {
    	UserLecture userLecture = userLectureRepository.findById(userLectureId).orElseThrow(CUserLectureNotFoundException::new);
        User teacher = userRepository.findById(userLecture.getLecture().getUser().getId()).orElseThrow(CUserNotFoundException::new);

        //강사의 평점의 총점, 카운트 감소시키기
        teacher.setRatingCnt(teacher.getRatingCnt()-1);
        teacher.setRatingSum(teacher.getRatingSum()-userLecture.getScore());

        //수강신청 내역에서 리뷰관련 내용 지우기
        userLecture.setReview(null);
        userLecture.setReviewUpdateDate(LocalDateTime.now());
        userLecture.setScore(0);
    }

    private LectureReviewResponseDTO entityToReviewDTO(UserLecture userLecture) {
        User user = userLecture.getUser();
        Lecture lecture = userLecture.getLecture();

        return LectureReviewResponseDTO.builder()
                .reviewId(userLecture.getUserLectureId())
                .userId(user.getUserId())
                .userName(user.getNickname())
                .date(userLecture.getRegistDate())
                .rating(userLecture.getScore())
                .lectureName(lecture.getName())
                .review(userLecture.getReview())
                .profileImage(user.getProfileImagePath())
                .build();
    }

    /**
     *
     * @param lectureId : 삭제할 강의의 pk
     * @return : 삭제된 수강 신청 내역 개수 반환(해당 강의의 수강 신청 개수 반환)
     */
    @Transactional
    public int deleteUserLectureByLectureId(Long lectureId) {
        int ret = 0;

        try {
            //  해당 강의의 모든 수강 신청 내역 찾아내기
            List<UserLecture> userLectureList = userLectureRepository.findByLecture_LectureId(lectureId).orElseThrow(CUserLectureNotFoundException::new);
            ret = userLectureList.size();

            for (UserLecture userLecture : userLectureList) {
                userLectureRepository.delete(userLecture);
            }
        } catch(CUserLectureNotFoundException e) {
            e.printStackTrace();
        } finally {
            return ret;
        }
    }

    /**
     *
     * @param userId : 탈퇴한 회원의 pk
     * @return : 삭제된 수강 신청 내역 개수(해당 수강생이 수강했던 강의 개수 반환)
     */
    @Transactional
    public int deleteUserLectureByUserId(Long userId) {
        int ret = 0;

        try {
            //  해당 수강생의 모든 수강 신청 내역 찾아내기
            List<UserLecture> userLectureList = userLectureRepository.findByUser_UserId(userId).orElseThrow(CUserLectureNotFoundException::new);
            ret = userLectureList.size();

            for (UserLecture userLecture : userLectureList) {
                userLectureRepository.delete(userLecture);
            }
        } catch(CUserLectureNotFoundException e) {
            e.printStackTrace();
        } finally {
            return ret;
        }
    }
}
