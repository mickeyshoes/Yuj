package com.yuj.lectureimage.service;

import com.yuj.exception.CImageNotFoundException;
import com.yuj.lectureimage.domain.ImageFile;
import com.yuj.lectureimage.repository.LectureImageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class LectureImageService {
    private final LectureImageRepository lectureImageRepository;

    /**
     *
     * @param lectureId : 삭제할 강의의 pk
     * @return : 삭제될 강의에 저장된 강의 이미지 개수
     */
    public int deleteLectureImagesByLectureId(Long lectureId) {
        int ret = 0;

        try {
            List<ImageFile> imageFileList = lectureImageRepository.findAllByLecture_LectureId(lectureId).orElseThrow(CImageNotFoundException::new);
            ret = imageFileList.size();

            for(ImageFile imageFile : imageFileList) {
                String filePath = new File("").getAbsolutePath() + File.separator + File.separator + "images" + File.separator + imageFile.getFilePath();  //  파일 경로 알아내기
                File file = new File(filePath);

                lectureImageRepository.delete(imageFile);
                if(!file.delete()) {
                    throw new CImageNotFoundException(imageFile.getOrigFileName() + "을 물리적으로 삭제하는 데 실패");
                }
            }
        } catch (CImageNotFoundException e) {
            e.printStackTrace();
        } finally {
            return ret;
        }
    }
}
