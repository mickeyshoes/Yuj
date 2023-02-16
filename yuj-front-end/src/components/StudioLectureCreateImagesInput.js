import React, { useRef, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Styles from "./StudioLectureCreateImagesInput.module.css";

const StudioLectureCreateImagesInput = (props) => {
  //미리보기, 데이터 전송
  let imgFiles = props.imgFiles;
  const setImgFiles = props.setImgFiles;

  // let imgTransfer = props.imgTransfer;

  console.log("initial imgTransfer = " + props.imgTransfer);

  const setImgTransfer = props.setImgTransfer;

  console.log("initial ");

  //이미지 업로드 input의 onChange 메소드
  const handleImageUpload = (e) => {
    const fileArr = e.target.files;
    const fileArrFrom = Array.from(e.target.files);

    console.log("fileArrFrom = " + fileArrFrom);
    // setImgTransfer(fileArrFrom);
    setImgTransfer(fileArr);
    // fileArrFrom.map((file) => {
    //   setImgTransfer([...props.imgTransfer, file]);
    // });
    // setImgTransfer(fileArrFrom);

    // imgTransfer = fileArrFrom;

    console.log("In StudioLectureCreateImagesInput");
    console.log("fileArr = " + fileArr);
    console.log("e.target.files[0] = " + JSON.stringify(e.target.files[0]));
    console.log("fileArr[0] = " + fileArr[0]);
    // setImgTransfer(fileArr);

    console.log("********************************************************");
    console.log(props.imgTransfer);
    console.log("********************************************************");

    let fileURLs = [];

    let file;
    //이 아랫줄에 숫자 10 대신 5 쓰면 작동 하지 않던데 이유가 뭘까..?
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length;

    for (let i = 0; i < filesLength; i++) {
      file = fileArr[i];
      let reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = reader.result;
        setImgFiles([...fileURLs]);
        // console.log(imgFiles);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="text-accent text-lg mb-4">강의 사진 등록</div>
      <div className="flex flex-wrap items-center gap-3">
        {/* 이미지 파일 프리뷰를 위한 img 태그 자동 생성 */}
        {imgFiles.map((file, index) => {
          return (
            <img className="w-48 h-fit rounded-lg" key={index} src={file} />
          );
        })}
        <div className="flex flex-wrap justify-center items-center gap-3">
          <label htmlFor="file">
            <div className={Styles.btnUpload}>
              <AddCircleOutlineIcon style={{ fontSize: "xx-large" }} />
            </div>
          </label>
          <input
            name="images"
            type="file"
            accept="image/*"
            multiple
            encType="multipart/form-data"
            onChange={handleImageUpload}
            className="hidden"
            id="file"
          />
        </div>
      </div>
    </>
  );
};

export default StudioLectureCreateImagesInput;
