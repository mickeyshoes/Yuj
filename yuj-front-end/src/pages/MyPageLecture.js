import React from "react";
import MypageSidebar from './../components/MypageSidebar';
import MainHeader from './../components/mainHeader/MainHeader';
import MainFooter from "../components/mainFooter/MainFooter";
import StudioSamplePage from './StudioSamplePage';
import TestLectureCard from './TestLectureCard(삭제예정)';
import TestLectureDetail from './TestLectureDetail(삭제예정)';


const MyPageLecture = () => {
    return(
        <>
            <MainHeader />
            <div className="flex">
                <MypageSidebar />
                <div>
                    <div>수강목록</div>
                    <div>영상 클릭시 스튜디오 이동하게 작업해야함</div>
                    <TestLectureCard/>
                </div>
            </div>
            <MainFooter />
        </>
    );
}

export default MyPageLecture;