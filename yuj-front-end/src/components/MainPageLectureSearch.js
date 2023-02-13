import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import LectureItemCard from "./LectureItemCard";
import StudioSidebar from "./StudioSidebar";
import StudioLectureListCategorySelectBox from "./StudioLectureListCategorySelectBox";
import { searchLecture } from '../stores/lectureSlice';
import { useNavigate, useLocation } from "react-router";


const StudioLectureSearch = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 마운트 시 헤더 검색어에 따라서 검색
    const { state } = useLocation();
    useEffect(() => {
        console.log('firstMount');
        dispatch(searchLecture(state))
        return () => {
        };
    }, []);
    let lectures = useSelector(state => state.lecture.lectures)
    
    // 검색어 바뀔 시에 검색어에 따라서 검색
    useEffect(() => { 
        console.log('secondMount');
        dispatch(searchLecture(state));
        return () => { 
        };
    }, [state])

    return (
        <>
            <div className="flex w-full">
                <div className="flex-auto px-40 pt-20">
                    <div className="flex justify-between items-center">
                        <p className="text-3xl font-bold text-accent mb-6 mr-3">강의 목록</p>
                        <div className="flex items-center">
                            <StudioLectureListCategorySelectBox />
                        </div>
                    </div>
                    <div className="flex py-12 px-0">
                        <div className="flex flex-wrap justify-start gap-9">
                            {lectures?.map((lecture) => (
                                <LectureItemCard thisLecture={lecture} key={lecture.lectureId} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudioLectureSearch;