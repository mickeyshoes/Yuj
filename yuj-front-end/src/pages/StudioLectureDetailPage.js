import React, { useState } from "react";
import { Link } from "react-router-dom";
import StudioSidebar from "../components/StudioSidebar";
import StudioLectureDetailCarousel from "../components/StudioLectureDetailCarousel";
import StudioLectureDetailInfoBox from "../components/StudioLectureDetailInfoBox";
import StudioLectureDetailSchedule from "../components/StudioLectureDetailSchedule";
import { StudioLectureDetailLectureRegistModal, StudioLectureDetailLectureRegistModalBtn } from "../components/StudioLectureDetailLectureRegistModal";
import { StudioLectureDetailLectureClosingModal, StudioLectureDetailLectureClosingModalBtn } from "../components/StudioLectureDetailLectureClosingModal";

const StudioLectureDetailPage = () => {
  const [userAuth, setUserAuth] = useState("teacher");

  //수강생 -> 수강 신청(수강 취소), 목록으로
  //강사 -> 수정하기, 폐강하기, 목록으로
  let lectureDetailButtons;
  if (userAuth === "user") {
    lectureDetailButtons = 
    <div>
      <StudioLectureDetailLectureRegistModalBtn text={"수강 신청"} className={"btn-accent text-white px-12"} />
    </div>;
  } else if (userAuth === "teacher") {
    lectureDetailButtons = 
    <div className="flex gap-2">
      <button className="btn btn-accent text-white px-12">수정하기</button>
      <StudioLectureDetailLectureClosingModalBtn text={"폐강하기"} className={"px-12"} />
    </div>;
  }

  return (
    <>
      <StudioLectureDetailLectureRegistModal 
        content={'수강 신청 하시겠습니까?'}
        buttons={[
          {
            text: "신청하기",
            className: "btn-accent text-white"
          },
          {
            text: "취소하기",
            className: "btn-primary text-black"
          },
        ]}
      />
      <StudioLectureDetailLectureClosingModal 
        content={"이 강의를 폐강하시겠습니까?"}
        buttons={[
          {
            text: "폐강하기",
            className: "btn-accent text-white"
          },
          {
            text: "취소하기",
            className: "btn-primary text-black"
          },
        ]}
      />
      <div className="flex w-full">
        {/* <StudioSidebar /> */}
        <div className="px-40 overflow-hidden">
          <div className="mt-5">
            <StudioLectureDetailCarousel />
          </div>
          <div className="mt-5">
            <StudioLectureDetailInfoBox />
          </div>
          <div className="mt-3">
            <StudioLectureDetailSchedule />
          </div>
          {/* 강사 및 수강생 별로 버튼 다르게 해야함*/}
          <div className="flex justify-end gap-2 pb-8">
            {lectureDetailButtons}
            <Link to="/studioLectureListPage"><button className="btn btn-primary px-12">목록으로</button></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudioLectureDetailPage;
