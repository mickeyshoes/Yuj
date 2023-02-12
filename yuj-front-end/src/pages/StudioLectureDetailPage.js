import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StudioSidebar from "../components/StudioSidebar";
import StudioLectureDetailCarousel from "../components/StudioLectureDetailCarousel";
import StudioLectureDetailInfoBox from "../components/StudioLectureDetailInfoBox";
import StudioLectureDetailSchedule from "../components/StudioLectureDetailSchedule";
import {
  StudioLectureDetailLectureRegistModal,
  StudioLectureDetailLectureRegistModalBtn,
} from "../components/StudioLectureDetailLectureRegistModal";
import {
  StudioLectureDetailLectureClosingModal,
  StudioLectureDetailLectureClosingModalBtn,
} from "../components/StudioLectureDetailLectureClosingModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudioDetail,
  getStudioLectureList,
  getStudioLiveLecture,
} from "../stores/studioSlice";
import { getLectureSchedule } from "../stores/lectureSlice";

const StudioLectureDetailPage = () => {

  const dispatch = useDispatch();

  //현재 탐색하고 있는 강의 불러오기 //리덕스 퍼시스트로 유지
  let lecture = useSelector((state) => state.studio.studioLectureDetailItem);

  const [userAuth, setUserAuth] = useState("teacher");

  //강의 종료 날짜와 현재 날짜를 비교하여 강의가 종료된 상태인지를 확인
  const date = new Date();
  const endDate = new Date(lecture.endDate);
  function endCheck() {
    if(date > endDate) {
      return true;
    } else{
      return false;
    }
  }

  //수강생 -> 수강 신청(수강 취소), 목록으로
  //강사 -> 수정하기, 폐강하기, 목록으로
  //단, endCheck가 true이면 목록으로 버튼만
  let lectureDetailButtons;
  if (userAuth === "user" && !endCheck()) {
    lectureDetailButtons = (
      <div>
        <StudioLectureDetailLectureRegistModalBtn
          text={"수강 신청"}
          className={"btn-accent text-white px-12"}
        />
      </div>
    );
  } else if (userAuth === "teacher" && !endCheck()) {
    lectureDetailButtons = (
      <div className="flex flex-wrap gap-2">
        <button className="btn btn-accent text-white px-12">수정하기</button>
        <StudioLectureDetailLectureClosingModalBtn
          text={"폐강하기"}
          className={"px-12"}
        />
      </div>
    );
  }

  //강의 스케줄 가져오기
  useEffect(() => {
    dispatch(getLectureSchedule(lecture.lectureId));
  }, [])
  let lectureSchedule = useSelector(state => state.lecture.lectureSchedule);

  //사이드바
  const user = useSelector((state) => state.user);
  const studio = useSelector((state) => state.studio);
  useEffect(() => {
    dispatch(getStudioDetail(user.userId));
    dispatch(getStudioLectureList(user.userId));
    dispatch(getStudioLiveLecture(user.userId));
  }, []);

  return (
    <>
      <StudioLectureDetailLectureRegistModal
        content={"수강 신청 하시겠습니까?"}
        buttons={[
          {
            text: "신청하기",
            className: "btn-accent text-white",
          },
          {
            text: "취소하기",
            className: "btn-primary text-black",
          },
        ]}
      />
      <StudioLectureDetailLectureClosingModal
        content={"이 강의를 폐강하시겠습니까?"}
        buttons={[
          {
            text: "폐강하기",
            className: "btn-accent text-white",
          },
          {
            text: "취소하기",
            className: "btn-primary text-black",
          },
        ]}
      />
      <div className="flex w-full">
        <StudioSidebar
          studioDetail={studio.studioDetail}
          userId={user.userId}
          studioLiveLecture={studio.studioLiveLecture}
        />
        <div className="px-40 overflow-hidden">
          <div className="mt-5">
            <StudioLectureDetailCarousel />
          </div>
          <div className="mt-5">
            <StudioLectureDetailInfoBox lecture={lecture} endCheck={endCheck()}/>
          </div>
          <div className="mt-3">
            <StudioLectureDetailSchedule lectureSchedule={lectureSchedule}/>
          </div>
          {/* 강사 및 수강생 별로 버튼 다르게 해야함*/}
          <div className="flex justify-end flex-wrap gap-2 pt-5 pb-8">
            {lectureDetailButtons}
            <Link to="/studioLectureListPage" className="flex">
              <button className="btn btn-primary px-12">목록으로</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudioLectureDetailPage;
