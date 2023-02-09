package com.yuj.user.service;

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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final TokenRepository tokenRepository;

    @Transactional(readOnly = true)
    public boolean isExist(String id) {
        //  이미 존재하는 id이면 true, 아니면 false
        return userRepository.findById(id).isPresent();
    }

    @Transactional
    public String signUp(UserSignupRequestDTO userSignupRequestDTO) {
        //  이미 존재하는 아이디인 경우
        if(isExist(userSignupRequestDTO.getId()))
            throw new CSignUpFailedCException("이미 존재하는 아이디입니다.");
        return userRepository.save(userSignupRequestDTO.toEntity(passwordEncoder)).getId();
    }

    @Transactional(readOnly = true)
    public UserResponseDTO searchById(String id) {
        User user = userRepository.findById(id).orElseThrow(CUserNotFoundException::new);

        return new UserResponseDTO(user);
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
}
