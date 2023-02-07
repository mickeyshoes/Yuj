import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Styles from "./StudioLectureCreateImagesInput.module.css";

const StudioLectureCreateImagesInput = () => {
  const imgs = <div>이미 삽입된 이미지들</div>;

  return (
    <>
      <div className="text-accent text-lg mb-4">강의 사진 등록</div>
      <div className="flex items-center gap-3">
        {imgs}
        <div>
          <label for="file">
            <div class={Styles.btnUpload}><AddCircleOutlineIcon style={{fontSize:"xx-large"}}/></div>
          </label>
          <input type="file" className="hidden" id="file"/>
        </div>
      </div>
    </>
  );
};

export default StudioLectureCreateImagesInput;
