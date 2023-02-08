package com.yuj.lecture.repository;

import com.yuj.lecture.domain.Yoga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface YogaRepository extends JpaRepository<Yoga, Long> {

}
