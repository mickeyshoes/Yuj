import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLecture } from "../stores/lectureSlice";
import { Link, useNavigate } from "react-router-dom";
import { changeStudioLectureDetailItem } from "../stores/studioSlice";

const LectureItemCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("props.thisLecture는 ");
  console.log(props.thisLecture);
  const lecture = props.thisLecture;

  const thumbnail = "/assets/Sample.jpg";

  const teacherProfile = "/assets/YujMainLogo.svg";

  // 강의 종료 날짜와 현재 날짜를 비교하여 '완료'를 띄워줄지 체크
  const date = new Date();
  const endDate = new Date(lecture.endDate);

  function complete() {
    if (endDate < date) {
      return (
        <div
          className="badge badge-outline bg-success p-4 text-xs font-semibold rounded-xl"
          style={{ color: "#fff", border: "0" }}
        >
          완료
        </div>
      );
    }
  }

  // 요가 카테고리 배지
  const yogaCategory = useSelector((state) => state.common.yogaCategory);
  function yogaCategorySearch(lecture) {
    if ("englishName" in lecture) {
      //마이페이지 수강목록에서 사용합니다.
      for (let i = 0; i < yogaCategory.length; i++) {
        return lecture.englishName;
      }
    } else {
      for (let i = 0; i < yogaCategory.length; i++) {
        // 기존에 있던 LectureItemCard방식입니다.
        if (yogaCategory[i].yogaId === lecture.yoga.yogaId) {
          return yogaCategory[i].englishName;
        }
      }
    }
  }

  // 아이템 카드에서 강사명 클릭 시 강사 스튜디오로 이동 -> 스튜디오 메인에서 아이디를 받아 데이터 조회
  function goStudio() {
    navigate("/studio", { state: { teacherId: lecture.userId } });
  }

  return (
    <div>
      <div className="card w-72 bg-base-100 shadow-xl min-h-full ">
        <figure className="relative">
          {/* changeStudioLectureDetailItem 메소드를 통해 DetailPage로 이동 시 띄워줄 강의 저장 */}
          <Link
            to="/studioLectureDetailPage"
            onClick={() => {
              dispatch(changeStudioLectureDetailItem(lecture));
            }}
          >
            <div className="card-actions absolute top-4 left-6">
              <div
                className="badge badge-outline bg-accent p-4 text-xs font-semibold rounded-xl"
                style={{ color: "#fff", border: "0" }}
              >
                {yogaCategorySearch(lecture)}
              </div>
              {complete()}
            </div>
            <img src={thumbnail} alt="Card Image" />
          </Link>
        </figure>
        <div className="card-body">
          <div className="flex justify-between items-center">
            <div>
              <button className="flex items-center" onClick={() => goStudio()}>
                <img className="h-3.5 pr-2" src={teacherProfile} />
                <div className="text-xs font-bold hover:text-accent">
                  {lecture.nickname}
                </div>
              </button>
            </div>
            <div className="text-xs font-bold">
              {lecture.totalCount} / {lecture.limitStudents}
            </div>
          </div>
          <Link
            to="/studioLectureDetailPage"
            onClick={() => {
              dispatch(changeStudioLectureDetailItem(lecture));
            }}
          >
            <p className="text-sm font-bold truncate text-ellipsis hover:text-accent">
              {/* 글자수 제한 및 대체 기능 구현 */}
              {lecture.name}
            </p>
            <p className="text-xs line-clamp-3 text-ellipsis hover:text-accent">
              {lecture.description}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LectureItemCard;
