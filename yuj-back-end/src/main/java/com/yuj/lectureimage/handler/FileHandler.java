package com.yuj.lectureimage.handler;

import com.yuj.lecture.domain.Lecture;
import com.yuj.lectureimage.domain.LectureImage;
import com.yuj.lectureimage.dto.LectureImageDto;
import com.yuj.lectureimage.service.LectureImageService;
import io.jsonwebtoken.lang.Collections;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class FileHandler {
    /**
     *
     * @param multipartFileList : 입력받은 다중 파일 리스트 (이건 어떻게 입력받을까???)
     * @return                  : 입력 받은 다중 파일 리스트에서 파일 각각을 LectureImage entity로 변환 후 리스트에 저장해서 그 리스트 반환
     * @throws Exception
     */
    public List<LectureImage> parseLectureImageInfo(List<MultipartFile> multipartFileList) throws Exception {
        //  반환할 파일 리스트
        List<LectureImage> retList = new ArrayList<>(); //  반환할 Entity List
        
        //  전달된 파일이 존재함
        if(!Collections.isEmpty(multipartFileList)) {
            //  파일명을 업로드한 날짜로 변환하여 저장
            LocalDateTime now = LocalDateTime.now();                                            //  업로드 시간
            DateTimeFormatter dateTimeFormatter= DateTimeFormatter.ofPattern("yyyyMMdd");
            String currentDate = now.format(dateTimeFormatter);

            //  프로젝트 디렉토리 내의 저장을 위한 절대 경로 설정
            //  경로 구분자 File.seperator 사용
            String absolutePath = new File("").getAbsolutePath() + File.separator + File.separator;

            //  파일을 저장할 세부 경로 지정
            String path = "images" + File.separator +  currentDate;
            File file = new File(path);

            //  디렉토리가 존재하지 않을 경우
            if(!file.exists()) {
                //  디렉토리를 생성
                boolean success = file.mkdirs();

                //  디렉토리 생성에 실패할 경우
                if (!success) {
                    log.error("file: was not successful");
                    return null;
                }
            }

            //  다중 파일 처리
            for(MultipartFile multipartFile : multipartFileList) {
                //  파일 확장자 추출
                String originalFileExtension = null;
                String contentType = multipartFile.getContentType();

                //  확장자명이 존재하지 않을 경우 처리 x
                if(ObjectUtils.isEmpty(contentType))
                    break;
                else {  //  확장자가 jpeg, jpg, png인 파일들만 받아서 처리
                    if(contentType.contains("image/jpeg") || contentType.contains("image/jpg") )
                        originalFileExtension = ".jpg";
                    else if(contentType.contains("image/png"))
                        originalFileExtension = ".png";
                    else break;
                }

                //  파일명 중복 방지를 위해 나노초까지 얻어와서 저장
                String newFileName = System.nanoTime() + originalFileExtension;

                //  파일 DTO 생성
                LectureImageDto lectureImageDto = LectureImageDto.builder()
                        .origFileName(multipartFile.getOriginalFilename())
                        .filePath(path + File.separator + newFileName)
                        .fileSize(multipartFile.getSize())
                        .build();

                System.out.println("filePath = " + lectureImageDto.getFilePath());

                //  파일 DTO를 이용하여 LectureImage 엔티티를 생성
                LectureImage lectureImage = new LectureImage(lectureImageDto.getOrigFileName(), lectureImageDto.getFilePath(), lectureImageDto.getFileSize());

                //  생성 후 리스트에 추가
                retList.add(lectureImage);

                //  업로드한 파일 데이터를 지정한 파일에 저장
                file = new File(absolutePath + path + File.separator + newFileName);
                multipartFile.transferTo(file);

                //  파일 권한 설정(쓰기, 읽기)
                file.setExecutable(true);
                file.setWritable(true);
                file.setReadable(true);
            }
        }

        return retList;
    } 
}
