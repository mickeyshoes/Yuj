package com.yuj.user.service;

import java.util.ArrayList;
import java.util.List;

import com.yuj.studio.domain.Studio;
import com.yuj.studio.service.StudioService;
import com.yuj.user.dto.response.TeacherResponseDTO;
import com.yuj.lectureimage.domain.ImageFile;
import com.yuj.lectureimage.handler.FileHandler;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yuj.config.jwt.JwtProvider;
import com.yuj.exception.CSignUpFailedCException;
import com.yuj.exception.CUserNotFoundException;
import com.yuj.user.domain.User;
import com.yuj.user.dto.request.UserSignupRequestDTO;
import com.yuj.user.dto.request.UserUpdateRequestDTO;
import com.yuj.user.dto.response.UserResponseDTO;
import com.yuj.user.repository.TokenRepository;
import com.yuj.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final StudioService studioService;
    private final PasswordEncoder passwordEncoder;
    private final FileHandler fileHandler;
    private final JwtProvider jwtProvider;
    private final TokenRepository tokenRepository;

    @Transactional(readOnly = true)
    public boolean isExist(String id) {
        //  이미 존재하는 id이면 true, 아니면 false
        return userRepository.findById(id).isPresent();
    }

    @Transactional
    public String signUp(List<MultipartFile> files, UserSignupRequestDTO userSignupRequestDTO) {
        String ret = "";
        Long userId = -1L;

        log.info("userSignupRequestDTO = " + userSignupRequestDTO);

        //  이미 존재하는 아이디인 경우
        if(isExist(userSignupRequestDTO.getId()))
            throw new CSignUpFailedCException("이미 존재하는 아이디입니다.");

        try {
            List<ImageFile> imageFileList = files!= null ? fileHandler.parseLectureImageInfo(files) : new ArrayList<>();

            //  파일이 존재하면 처리
            if(!imageFileList.isEmpty()) {
                ImageFile imageFile = imageFileList.get(0);
                userSignupRequestDTO.setProfileImagePath(imageFile.getFilePath());
            } else {    //   파일이 존재하지 않으면 기본 파일
                ImageFile imageFile = ImageFile.builder().filePath("defaultProfile.jpg").fileSize(10485L).origFileName("defaultProfile.jpg").build();
                userSignupRequestDTO.setProfileImagePath(imageFile.getFilePath());
            }

            User user = userRepository.save(userSignupRequestDTO.toEntity(passwordEncoder));
//            userId = userRepository.save(userSignupRequestDTO.toEntity(passwordEncoder)).getUserId();
            userId = user.getUserId();
            log.info("User = " + user);

            ret += "회원가입한 id = " + userSignupRequestDTO.getId();
            
            if(userSignupRequestDTO.getRoleName().equals("ROLE_TEACHER")) { //  강사일 경우 studio 생성
                Long studioId = studioService.createStudio(userId);
                ret += "\n스튜디오 번호 = " + studioId;
            }
        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            return ret;
        }
    }

    @Transactional(readOnly = true)
    public UserResponseDTO searchById(String id) {
        log.info("searchById(" + id + ")");

        User user = userRepository.findById(id).orElseThrow(CUserNotFoundException::new);
        log.info("user = " + user);

        return entityToResponseDTO(user);
    }

    @Transactional(readOnly = true)
    public UserResponseDTO searchByUserId(String id) {
        long userId = Long.parseLong(id);

        log.info("searchById(" + userId + ")");

        User user = userRepository.findById(userId).orElseThrow(CUserNotFoundException::new);
        log.info("user = " + user);

        return entityToResponseDTO(user);
    }
    @Transactional
    public boolean updateUser(String id, UserUpdateRequestDTO updateRequestDTO) {
        User modifiedUser = userRepository.findById(id).orElseThrow(CUserNotFoundException::new);

        modifiedUser.setPassword(passwordEncoder.encode(updateRequestDTO.getPassword()));
        modifiedUser.setName(updateRequestDTO.getName());
        modifiedUser.setNickname(updateRequestDTO.getNickname());
        modifiedUser.setPhone(updateRequestDTO.getPhone());
        modifiedUser.setEmail(updateRequestDTO.getEmail());
        modifiedUser.setProfileImagePath(updateRequestDTO.getProfileImagePath());

        return true;
    }
    
    public List<TeacherResponseDTO> searchTeacherByName(String name){
    	List<TeacherResponseDTO> result = new ArrayList<>();
    	List<User> list = userRepository.findUser(name);
    	for (User user : list) {
			result.add(entityToTeacherResponseDTO(user));
		}

    	return result;
    }
    
    private UserResponseDTO entityToResponseDTO(User user) {
    	return UserResponseDTO.builder()
        		.id(user.getId())
        		.name(user.getName())
        		.nickname(user.getNickname())
        		.phone(user.getPhone())
        		.email(user.getEmail())
        		.birthDate(user.getBirthDate())
        		.gender(user.getGender())
        		.profileImage("null".equals(user.getProfileImagePath()) ? "logo192.png" : user.getProfileImagePath())
        		.isTeacher(user.isTeacher())
        		.rating((float)user.getRatingSum() /user.getRatingCnt())
        		.build();
    }
    private TeacherResponseDTO entityToTeacherResponseDTO(User user) {
        Studio studio = user.getStudio();
        float rating = user.getRatingCnt() == 0 ? 3 : (float) user.getRatingSum() / user.getRatingCnt();
        return TeacherResponseDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .nickname(user.getNickname())
                .phone(user.getPhone())
                .email(user.getEmail())
                .birthDate(user.getBirthDate())
                .gender(user.getGender())
                .profileImage("null".equals(user.getProfileImagePath()) ? "logo192.png" : user.getProfileImagePath())
                .isTeacher(user.isTeacher())
                .rating(rating)
                .description(studio.getDescription())
                .userId(user.getUserId())
                .build();
    }
}
