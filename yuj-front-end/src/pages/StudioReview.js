import axios from "axios";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CreateIcon from "@mui/icons-material/Create";
import StudioSidebar from "../components/StudioSidebar";
import PageHeadPTag from "../components/pageItems/PageHeadPTag";
import LectureReviewItem from "../components/LectureReviewItem";
import { useNavigate } from "react-router";

const StudioReview = (props) => {
  const user = useSelector((state) => state.user);
  const studio = useSelector((state) => state.studio);
  const navigate = useNavigate();

  const [reviewList, setReviewList] = useState([]);

  //init - get all review for lecture(teacher's only)
  useEffect(() => {
    getReviews();
    // console.log('댓글 리스트 : ', reviewList);
    // console.log('회원 계정', typeof(user.userId));
    // console.log('스튜디오 강사 아이디', typeof(studios.studioDetail.userId));
  }, []);

  // change axios, add async
  const getReviews = async () => {
    // const url = process.env.REACT_APP_API_URL + '/';
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/lectures/userLectures/review?userId=${studio.studioDetail.userId}`
      // `http://localhost:5000/lectures/userLectures/review?userId=${studio.studioDetail.userId}`
      // `https://i8a504.p.ssafy.io/api/lectures/userLectures/review?userId=${studio.studioDetail.userId}`
    );
    setReviewList(response.data);
  };

  async function addReview() {
    navigate("/studio/addReview");
  }

  return (
    <>
      <div className="flex w-full">
        <StudioSidebar
          studioDetail={studio.studioDetail}
          userId={studio.userId}
          studioLiveLecture={studio.studioLiveLecture}
        />
        <div className="flex-auto px-40 pt-20">
          <PageHeadPTag content="강의 후기" />
          <div className="flex justify-between mb-3">
            <div>
              <span className="text-success">
                총 {reviewList.length}개의 후기
              </span>
            </div>
            {studio.studioDetail.studioId === user.userId ||
            user.userId === -1 ? (
              <button
                className="border-none btn-accent btn text-white gap-2 pl-2 pr-4 btn-sm "
                disabled
                style={{ "background-color": "#cccccc" }}
              >
                <CreateIcon />
                후기 작성
              </button>
            ) : (
              <button
                className="border-none btn-accent btn text-white gap-2 pl-2 pr-4 btn-sm"
                onClick={addReview}
              >
                <CreateIcon />
                후기 작성
              </button>
            )}
          </div>
          <div className="items-center">
            {reviewList?.map((item, idx) => (
              <LectureReviewItem
                className="pt-20"
                item={item}
                key={idx}
                getReviews={getReviews}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudioReview;
