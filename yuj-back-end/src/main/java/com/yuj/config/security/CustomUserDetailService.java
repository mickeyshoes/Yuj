package com.yuj.config.security;

import com.yuj.exception.CUserNotFoundException;
import com.yuj.user.domain.User;
import com.yuj.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Slf4j
public class CustomUserDetailService implements UserDetailsService  {
    private final UserRepository userRepository;
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            Long pk = Long.parseLong(username);

            log.info("in loadUserByUsername");
            List<User> userList = userRepository.findAll();

            log.info("userRepository = " + userList);
            log.info("size = " + userList.size());
            log.info("username = " + username);
            log.info("pk = " + pk);

            return userRepository.findById(pk).orElseThrow(CUserNotFoundException::new);
    }

    @Transactional(readOnly = true)
    public UserDetails loadUserByUserId(String userId) throws UsernameNotFoundException {
        Long pk = Long.parseLong(userId);

        log.info("in loadUserByUserId");
        log.info("userId = {}",pk);
        return userRepository.findById(pk).orElseThrow(CUserNotFoundException::new);
    }
}
