import React from "react";
import StudioLectureListCategorySelectBox from "./StudioLectureListCategorySelectBox";
import { useNavigate } from 'react-router-dom';
import {
  StudioLectureOpeningModal,
  StudioLectureOpeningModalBtn,
} from "./StudioLectureOpeningModal";

const StudioLectureListTopBar = (props) => {
  const userAuth = props.userAuth;
  const lectureCount = props.lectureCount;
  const navigate = useNavigate();

  let lectureOpeningButton;
  if (userAuth === "teacher") {
    lectureOpeningButton = (
      <StudioLectureOpeningModalBtn
        text="강의 개설"
        className={"btn btn-sm btn-accent w-30 ml-4 text-white rounded-md"}
      />
    );
  } else {
  }

  return (
    <>
      <StudioLectureOpeningModal 
        content={'강의를 개설하시겠습니까?'}
        buttons={[
            {
                text: "개설하기",
                className: "btn-accent text-white",
                onClickEvent: () => {
                  navigate("/studioLectureCreatePage")
                }
              },
              {
                text: "취소하기",
                className: "btn-primary text-black"
              }
        ]}
      />
      <div className="flex justify-between items-center">
        <span className="text-success">총 {lectureCount}개의 강의</span>
        <div className="flex items-center">
          <StudioLectureListCategorySelectBox />
          {lectureOpeningButton}
        </div>
      </div>
    </>
  );
};

export default StudioLectureListTopBar;
