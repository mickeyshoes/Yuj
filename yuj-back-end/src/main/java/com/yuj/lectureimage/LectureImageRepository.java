package com.yuj.lectureimage;

import com.yuj.lectureimage.domain.LectureImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LectureImageRepository extends JpaRepository<LectureImage, Long> {
}
