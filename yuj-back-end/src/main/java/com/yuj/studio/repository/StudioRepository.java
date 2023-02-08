package com.yuj.studio.repository;

import com.yuj.studio.domain.Studio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudioRepository extends JpaRepository<Studio, Long> {

    Optional<Studio> findByUser_UserId(Long id);
}
