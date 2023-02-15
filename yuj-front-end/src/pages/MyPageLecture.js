import React from "react";
import MyPageSidebar from '../components/MyPageSidebar';
import axios from "axios";
import { useState, useEffect, } from "react";
import LectureItemCard from "../components/LectureItemCard";
import { useSelector } from 'react-redux';
import MyPageLoginCheck from "../utils/MyPageLoginCheck";

const LOCAL_URL = "http://localhost:5000";
const URL = LOCAL_URL;

const MyPageLecture = () => {

    const user = useSelector(state => state.user);
    MyPageLoginCheck(user);

    const [lectures, setLectures] = useState([]);

    useEffect(() => {
        axios({
            method: "GET",
            url: `${URL}/mypage/dashboard/${user.userId}` //u
        }).then(res => {
            console.log(res.data)
            setLectures(res.data);
        })
            .catch(e => {
                console.log(e);
            });
    }, []);

    return (
        <>
            <div className="flex w-full">
                <MyPageSidebar />
                <div className="px-40 pt-20 w-full">
                    <p className="text-3xl font-bold text-accent mb-6 ">강의 목록</p>
                    <div className="flex flex-wrap w-full justify-start gap-9">
                        {lectures.map((lecture, idx) => (
                            <div key={idx}>
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