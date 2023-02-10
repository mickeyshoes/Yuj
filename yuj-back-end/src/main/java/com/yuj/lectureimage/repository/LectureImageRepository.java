package com.yuj.lectureimage.repository;

import com.yuj.lecture.domain.Lecture;
import com.yuj.lectureimage.domain.LectureImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LectureImageRepository extends JpaRepository<LectureImage, Long> {
    LectureImage save(LectureImage lectureImage);
}
