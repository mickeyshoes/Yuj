import React from "react";
import MyPageSidebar from '../components/MyPageSidebar';
import axios from "axios";
import { useState, useEffect, } from "react";
import LectureItemCard from "../components/LectureItemCard";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LOCAL_URL = "http://localhost:5000";
const URL = LOCAL_URL;

const MyPageLecture = () => {

    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if(user.userId === ''){
            navigate('/login');
        }
    },[])

    const [lectures, setLectures] = useState([]);

    useEffect(() => {
        axios({
            method: "GET",
            url: `${URL}/mypage/dashboard/${user.userId}` //u
        }).then(res => {
            // 가져온 강의들을 강의 완료된것들은 뒤쪽으로 정렬, 등록일을 기준으로 최신 등록한 강의를 앞으로 정렬
            // Sort the lectures array based on endDate and userRegistDate
            const sortedLectures = res.data.sort((a, b) => {
                // Compare the endDate of the two lectures
                const endDateComparison = new Date(b.endDate) - new Date(a.endDate);
                if (endDateComparison !== 0) {
                    // If the endDate is different, return the comparison result
                    return endDateComparison;
                } else {
                    // If the endDate is the same, compare userRegistDate
                    const userRegistDateComparison = new Date(a.userRegistDate) - new Date(b.userRegistDate);
                    return userRegistDateComparison;
                }
            });

            setLectures(sortedLectures);
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