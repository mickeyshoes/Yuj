import React from "react";
import LectureItemCard from "./components/LectureItemCard";
import StudioSidebar from "../components/StudioSidebar";
import StudioLectureListCategorySelectBox from "./StudioLectureListCategorySelectBox";

const StudioLectureSearch = () => {
    return (
        <>
            <div className="flex w-full">
                <StudioSidebar />
                <div className="flex-auto px-40 pt-20">
                <p className="text-3xl font-bold text-accent mb-6 mr-3">강의 목록</p>
                <div className="flex justify-between items-center">
                    <span className="text-success">총 1개의 강의</span>
                    <div className="flex items-center">
                        <StudioLectureListCategorySelectBox />
                    </div>
                </div>
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
}

export default StudioLectureSearch;