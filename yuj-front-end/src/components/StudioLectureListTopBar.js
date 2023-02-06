import React from "react";
import StudioLectureListCategorySelectBox from "./StudioLectureListCategorySelectBox";
import {
  StudioLectureOpeningModal,
  StudioLectureOpeningModalBtn,
} from "./StudioLectureOpeningModal";

const StudioLectureListTopBar = (props) => {
  const userAuth = props.userAuth;
  const yogaCategory = props.yogaCategory;

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
              },
              {
                text: "취소하기",
                className: "btn-primary text-black"
              }
        ]}
      />
      <div className="flex justify-between items-center">
        <span className="text-success">총 1개의 강의</span>
        <div className="flex items-center">
          <StudioLectureListCategorySelectBox yogaCategory={yogaCategory} />
          {lectureOpeningButton}
        </div>
      </div>
    </>
  );
};

export default StudioLectureListTopBar;
