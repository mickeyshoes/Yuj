package com.yuj.user.service;

import java.util.ArrayList;
import java.util.List;

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

        //  이미 존재하는 아이디인 경우
        if(isExist(userSignupRequestDTO.getId()))
            throw new CSignUpFailedCException("이미 존재하는 아이디입니다.");

        try {
            List<ImageFile> imageFileList = fileHandler.parseLectureImageInfo(files);

            //  파일이 존재하면 처리
            if(!imageFileList.isEmpty()) {
                ImageFile imageFile = imageFileList.get(0);
                userSignupRequestDTO.setProfileImagePath(imageFile.getFilePath());
            }

            ret = userRepository.save(userSignupRequestDTO.toEntity(passwordEncoder)).getId();
        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            return ret;
        }
    }

    @Transactional(readOnly = true)
    public UserResponseDTO searchById(String id) {
        User user = userRepository.findById(id).orElseThrow(CUserNotFoundException::new);
        
        return entityToResponseDTO(user);
    }

    @Transactional(readOnly = true)
    public UserResponseDTO searchByUserId(String id) {
        long userId = Long.parseLong(id);
        User user = userRepository.findById(userId).orElseThrow(CUserNotFoundException::new);

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
    
    public List<UserResponseDTO> searchTeacherByName(String name){
    	List<UserResponseDTO> result = new ArrayList<>();
    	List<User> list = userRepository.findUser(name);
    	for (User user : list) {
			result.add(entityToResponseDTO(user));
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
        		.profileImage(user.getProfileImagePath())
        		.isTeacher(user.isTeacher())
        		.build();
    }
}
