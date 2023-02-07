import React, { useRef, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Styles from "./StudioLectureCreateImagesInput.module.css";

const StudioLectureCreateImagesInput = () => {

  const [imgFiles, setImgFiles] = useState([]);

  //이미지 업로드 input의 onChange 메소드 //최대 5장의 이미지

  let imgFilesPreview =
    <div className="flex w-wrap gap-3">
      {imgFiles.map((file, index) => {
        return (
          <img className="" key={index} src={file} />
        );
      })}
    </div>

  const handleImageUpload = (e) => {
    const fileArr = e.target.files;

    let fileURLs = [];

    let file;
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length;

    for (let i = 0; i < filesLength; i++) {
      file = fileArr[i];
      let reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = reader.result;
        setImgFiles([...fileURLs]);
        console.log(imgFiles);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="text-accent text-lg mb-4">강의 사진 등록</div>
      <div className="flex flex-wrap items-center gap-3">
        {imgFiles.map((file, index) => {
          return (
            <img className="w-48 h-fit rounded-lg" key={index} src={file} />
          );
        })}
        <div className="flex flex-wrap justify-center items-center gap-3">
          <label htmlFor="file">
            <div className={Styles.btnUpload}><AddCircleOutlineIcon style={{ fontSize: "xx-large" }} /></div>
          </label>
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" id="file" />
        </div>
      </div>
    </>
  );
};

export default StudioLectureCreateImagesInput;
