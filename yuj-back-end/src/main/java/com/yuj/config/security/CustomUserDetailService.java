package com.yuj.config.security;

import com.yuj.exception.CUserNotFoundException;
import com.yuj.user.domain.User;
import com.yuj.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CustomUserDetailService implements UserDetailsService  {
    private final UserRepository userRepository;
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        return userRepository.findById(Long.parseLong(username)).orElseThrow(CUserNotFoundException::new);
            Long pk = Long.parseLong(username);

            System.out.println("in loadUserByUsername");
            List<User> userList = userRepository.findAll();
            System.out.println("userRepository = " + userList);
            System.out.println("size = " + userList.size());

            System.out.println("username = " + username);
            System.out.println("pk = " + pk);
            return userRepository.findById(pk).orElseThrow(CUserNotFoundException::new);
    }
}
