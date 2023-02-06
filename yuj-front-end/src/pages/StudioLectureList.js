import React, { useState } from "react";
import LectureItemCard from "../components/LectureItemCard";
import StudioLectureListTopBar from "../components/StudioLectureListTopBar";
import StudioSidebar from "../components/StudioSidebar";

const StudioLectureList = () => {
  //유저의 권한이 강사일 때 강의개설 버튼 생성
  const [userAuth, setUserAuth] = useState("teacher");

  const [yogaCategory, setYogaCategory] = useState([
    "Raja",
    "Jnana",
    "Karma",
    "Bhakti",
    "Hahta",
  ]);

  return (
    <>
      <div className="flex w-full">
        <StudioSidebar />
        <div className="flex-auto px-40 pt-20">
          <p className="text-3xl font-bold text-accent mb-6 mr-3">강의 목록</p>
          <StudioLectureListTopBar userAuth={userAuth} yogaCategory={yogaCategory} />
          <div className="flex py-12 px-20">
            <div className="flex flex-wrap justify-start gap-10">
              <LectureItemCard />
              <LectureItemCard />
              <LectureItemCard />
              <LectureItemCard />
              <LectureItemCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudioLectureList;
