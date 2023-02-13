import React from "react";
import MyPageSidebar from '../components/MyPageSidebar';
import axios from "axios";
import { useState, useEffect, } from "react";
import LectureItemCard from "../components/LectureItemCard";

const LOCAL_URL = "http://localhost:5000";
const URL = LOCAL_URL;

const MyPageLecture = () => {

    useEffect(() => {
        axios({
            method: "GET",
            url: `${URL}/mypage/dashboard/3`
        }).then(res => {
            setLectures(res.data);
        })
            .catch(e => {
                console.log(e);
            });
    }, []);

    const [lectures, setLectures] = useState([]);

    return (
        <>
            <div className="flex w-full">
                <MyPageSidebar />
                <div className="px-40 pt-20 w-full">
                    <p className="text-3xl font-bold text-accent mb-6 ">강의 목록</p>
                    <div className="flex flex-wrap w-full justify-start gap-9">
                        {lectures.map(lecture => (
                            <div key={lecture.lectureId}>
                                {console.log("MyPageLecture lecture: ", lecture)}
                                <LectureItemCard thisLecture={lecture} key={lecture.lectureId} />
                            </div>
                        ))}
                        {/* 임시로 복사해둔 것입니다. */}
                        {lectures.map(lecture => (
                            <div key={lecture.lectureId}>
                                <LectureItemCard thisLecture={lecture} key={lecture.lectureId} />
                            </div>
                        ))}
                        {lectures.map(lecture => (
                            <div key={lecture.lectureId}>
                                {console.log("MyPageLecture lecture: ", lecture)}
                                <LectureItemCard thisLecture={lecture} key={lecture.lectureId} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyPageLecture;