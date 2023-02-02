import React from "react";
import MypageSidebar from "../components/MypageSidebar";
import MypageHeader from '../assets/mypage-header.png';
import './pages.css';
import MainHeader from './../components/mainHeader/MainHeader';
import MainFooter from "../components/mainFooter/MainFooter";


const MyPageDashBoard = () => {
    return (
        <>
            <MainHeader />
            <container className="flex ml-100">
                <MypageSidebar />
                <main>
                    <img className="w-screen max-h-52 " src={MypageHeader} />
                    <div className="mx-28 mt-16">
                        <div className="w-screen flex " style={{ backgroundColor: "aqua" }}>
                            <div style={{ width: "30%", height: "415px", backgroundColor: "gray", margin: "50px" }}>
                                <div className="flex m-5 justify-between" >
                                    <div >
                                        <div>현재</div>
                                        <div>수강중인</div>
                                        <div>강의</div>
                                    </div>
                                    <div>전체보기 &gt;</div>
                                </div>
                                만약 1개도 존재하지 않으면 수강중인 강의가 없습니다.
                                get으로 강의리스트 가져오고 최신3개까지만 썸네일 가져와서 
                                좌측div에 강의썸네일 우측에는 강의제목, 강의예정 시간
                                url링크 걸어서 강의 스튜디오로이동해야함
                                

                            </div>
                            <div style={{ width: "30%", height: "415px", backgroundColor: "blue", margin: "50px" }}>
                                수강 완료한 강의 컴포넌트
                            </div>
                            <div style={{ width: "30%", height: "415px", backgroundColor: "black", margin: "50px" }}>
                                주간 학습 달성률 컴포넌트
                            </div>
                        </div>
                        <div>
                            학습 일정 캘린더
                        </div>
                    </div>
                </main>
            </container>
            <div>
                <MainFooter />
            </div>


        </>
    );
}

export default MyPageDashBoard;