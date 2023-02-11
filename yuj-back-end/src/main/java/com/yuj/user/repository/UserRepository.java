package com.yuj.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.yuj.user.domain.User;
 
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    //  User의 로그인 아이디로 User 검색
    @Query(value = "select user " + "from User user " 
            + "where user.id = :id")
    Optional<User> findById(String id);
    
 // 강사의 이름에 name 키워드가 들어있다면 모두 반환
    @Query(value = "select user from User user where user.name like %:name% and user.isTeacher = true order by user.name")
    List<User> findUser(@Param("name") String name);
}
