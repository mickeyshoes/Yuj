package com.yuj.lectureimage.repository;

import com.yuj.lectureimage.domain.ImageFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LectureImageRepository extends JpaRepository<ImageFile, Long> {
    ImageFile save(ImageFile imageFile);
}
