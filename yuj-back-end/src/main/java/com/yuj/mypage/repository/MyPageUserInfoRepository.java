package com.yuj.mypage.repository;

import com.yuj.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyPageUserInfoRepository extends JpaRepository<User, Long> {
}
