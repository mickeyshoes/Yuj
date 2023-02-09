import React, { useState } from "react";
import LectureItemCard from "../components/LectureItemCard";
import StudioLectureListTopBar from "../components/StudioLectureListTopBar";
import StudioSidebar from "../components/StudioSidebar";

const StudioLectureListPage = () => {
  //컴포넌트가 마운트 될 때 특정 lecture에 관한 정보를 데이터베이스에서 불러오기
  // const dispatch = useDispatch();
  // useEffect(() => {
  //     console.log('mount');
  //     dispatch();
  //     return () => {
  //     };
  // }, []);


  //유저의 권한이 강사일 때 강의개설 버튼 생성
  const [userAuth, setUserAuth] = useState("teacher");

  return (
    <>
      <div className="flex w-full">
        <StudioSidebar />
        <div className="flex-auto px-40 pt-20">
          <p className="text-3xl font-bold text-accent mb-6 mr-3">강의 목록</p>
          <StudioLectureListTopBar userAuth={userAuth} />
          <div className="flex py-12 px-0">
            <div className="flex flex-wrap justify-start gap-9">
              <LectureItemCard thislecture={1} />
              <LectureItemCard lectureId={2} />
              <LectureItemCard lectureId={3} />
              <LectureItemCard lectureId={4} />
              <LectureItemCard lectureId={5} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudioLectureListPage;
