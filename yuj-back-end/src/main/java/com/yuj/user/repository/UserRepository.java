package com.yuj.user.repository;

import com.yuj.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    //  User의 로그인 아이디로 User 검색
    @Query(value = "select user " + "from User user " 
            + "where user.id = :id")
    Optional<User> findById(String id);
}
