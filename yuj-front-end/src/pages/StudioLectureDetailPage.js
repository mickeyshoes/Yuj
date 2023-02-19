import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { changeUserLecture, deleteUserLecture, getLectureSchedule, getUserLecture, registUserLecture } from "../stores/lectureSlice";
import { StudioLectureDetailLectureRegistCancelModal, StudioLectureDetailLectureRegistCancelModalBtn } from "../components/StudioLectureDetailLectureRegistCancelModal";

const StudioLectureDetailPage = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  //현재 탐색하고 있는 강의 불러오기 //리덕스 퍼시스트로 유지
  const lecture = useSelector((state) => state.studio.studioLectureDetailItem);
  const user = useSelector((state) => state.user);
  const studio = useSelector((state) => state.studio);
  const userId = user.userId;
  const teacherId = lecture.userId;
  console.log("lecture : " ,lecture);
  // console.log(user);
  // console.log(userId);
  // console.log(teacherId);
  // console.log(lecture);
  //강의 종료 날짜와 현재 날짜를 비교하여 강의가 종료된 상태인지를 확인
  const date = new Date();
  const endDate = new Date(lecture.endDate);
  function endCheck() {
    if (date > endDate) {
      return true;
    } else {
      return false;
    }
  }

  //현재 들어온 유저가 수강생인지를 확인
  useEffect(() => {
    // changeUserLecture({});
    console.log("userId ::" + userId);
    console.log(lecture.lectureId);
    dispatch(getUserLecture({userId: user.userId, lectureId: lecture.lectureId}));
  }, [])
  const userLecture = useSelector(state => state.lecture.userLecture);
  useEffect(() => {
    console.log(userLecture);
  },[userLecture])

  // 수강생 -> 수강 신청(수강 취소), 목록으로
  // 강사 -> 수정하기, 폐강하기, 목록으로
  // 단, endCheck가 true이면 목록으로 버튼만
  function userRole() {
    if (userId == teacherId) return "teacher";
    else return "user";
  }

  let lectureDetailButtons;
  console.log("userRole : " + userRole())
  if (user.userId === -1) {
    //로그인한 유저 정보가 없는 경우 목록으로 버튼만
    lectureDetailButtons = (
      <></>
    )
  } else if (userRole() === "user" && !endCheck()) {
    console.log(userLecture)
    if(userLecture === {} || !userLecture.state ) {
    lectureDetailButtons = (
      <div>
        <StudioLectureDetailLectureRegistModalBtn
          text={"수강 신청"}
          className={"btn-accent text-white px-12"}
        />
      </div>
    );
    } else {
      lectureDetailButtons = (
        <div>
          <StudioLectureDetailLectureRegistCancelModalBtn
            text={"수강 취소"}
            className={"btn-accent text-white px-12"}
          />
        </div>
      );
    }
  } else if (userRole() === "teacher" && !endCheck()) {
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
  }, []);
  let lectureSchedule = useSelector((state) => state.lecture.lectureSchedule);

  //사이드바
  useEffect(() => {
    dispatch(getStudioDetail(lecture.userId));
    dispatch(getStudioLectureList(lecture.userId));
    dispatch(getStudioLiveLecture(lecture.userId));
  }, []);

  //수강신청
  const registUL = () => {
    dispatch(registUserLecture({userId: user.userId, lectureId: lecture.lectureId}));
    window.location.reload();
  }

  //수강취소
  const deleteUL = () => {
    console.log(user.userId, lecture.lectureId);
    dispatch(deleteUserLecture({userId: user.userId, lectureId: lecture.lectureId}));
    window.location.reload();
  }

  return (
    <>
      <StudioLectureDetailLectureRegistModal
        content={"수강 신청 하시겠습니까?"}
        buttons={[
          {
            text: "확인",
            className: "btn-accent text-white",
            onClickEvent: () => registUL(),
          },
          {
            text: "취소",
            className: "btn-primary text-black",
          },
        ]}
      />
      <StudioLectureDetailLectureRegistCancelModal
        content={"수강 취소 하시겠습니까?"}
        buttons={[
          {
            text: "확인",
            className: "btn-accent text-white",
            onClickEvent: () => deleteUL(),
          },
          {
            text: "취소",
            className: "btn-primary text-black",
          },
        ]}
      />
      <StudioLectureDetailLectureClosingModal
        content={"이 강의를 폐강하시겠습니까?"}
        buttons={[
          {
            text: "확인",
            className: "btn-accent text-white",
          },
          {
            text: "취소",
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
            <StudioLectureDetailCarousel thisLecture={lecture}/>
          </div>
          <div className="mt-5">
            <StudioLectureDetailInfoBox
              lecture={lecture}
              endCheck={endCheck()}
            />
          </div>
          <div className="mt-3">
            <StudioLectureDetailSchedule lectureSchedule={lectureSchedule} />
          </div>
          {/* 강사 및 수강생 별로 버튼 다르게 해야함*/}
          <div className="flex justify-end flex-wrap gap-2 pt-5 pb-8">
            {lectureDetailButtons}
            {/* <Link to="/studioLectureListPage" className="flex"> */}
              <button className="btn btn-primary px-12" onClick={() => navigate(-1)}>뒤로가기</button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudioLectureDetailPage;
