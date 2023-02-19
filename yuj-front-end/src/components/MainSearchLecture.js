import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LectureItemCard from "./LectureItemCard";
import { searchLectures } from "../stores/lectureSlice";
import SearchIcon from "@mui/icons-material/Search";
import MainSearchLectureListCategorySelectBox from "./MainSearchLectureListCategorySelectBox";
import { getYogaList } from "../stores/commonSlice";

const MainSearchLecture = () => {
  //컴포넌트가 마운트 될 때 yoga category를 데이터베이스에서 불러와 셀렉트 박스에 띄우기
  //아래의 빈 [] 배열을 넣어주어야 화면이 첫 렌더링 될 때 한번만 실행됨.
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getYogaList());
  }, []);

  const [keyword, setKeyword] = useState("");
  let lectures = useSelector((state) => state.lecture.lecturesSearched);

  const doSearch = () => {
    dispatch(searchLectures(keyword));
  };

  const handleOnKeyPress = (e) => {
    console.log(e);
    if (e.key === "Enter") {
      doSearch();
    }
  };

  useEffect(() => {
    if (lectures.length === 0) {
      doSearch();
    }
  }, []);

  return (
    <>
      <div className="flex w-full">
        <div className="flex-auto px-40 pt-20">
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold text-accent mr-3">강의 목록</p>
            <div className="flex">
              <div className="flex items-center mr-3">
                <MainSearchLectureListCategorySelectBox keyword={keyword} />
              </div>
              <div
                className="form-control"
                style={{ position: "relative", paddingRight: "0px" }}
              >
                <input
                  onKeyPress={handleOnKeyPress}
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  type="text"
                  placeholder="검색어를 입력해주세요"
                  className={
                    "input w-60 text-black text-xs rounded-xl input-sm bg-secondary"
                  }
                />
                <button
                  onClick={() => doSearch()}
                  className={"btn btn-xs btn-secondary border-none btn-circle"}
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "10px",
                    height: "1rem",
                  }}
                >
                  <SearchIcon style={{ height: "1rem" }} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex py-12 px-0">
            <div className="flex flex-wrap justify-start gap-4">
              {lectures?.map(
                (lecture) => (
                  (
                    <LectureItemCard
                      key={lecture.lectureId}
                      thisLecture={lecture}
                    />
                  )
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSearchLecture;
