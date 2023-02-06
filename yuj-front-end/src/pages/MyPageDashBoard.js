import React from "react";
import MyPageSidebar from "../components/MyPageSidebar";
import Styles from "./MyPages.module.css";
import MainHeader from './../components/mainHeader/MainHeader';
import MainFooter from "../components/mainFooter/MainFooter";
import MyPageWeeklyStudyChart from '../components/MyPageWeeklyStudyChart';
import MyPageCalendar from "../components/MyPageCalendar";

const MyPageDashBoard = () => {
    return (
        <>
            <MainHeader />
            <container className="flex ml-100">
                <MyPageSidebar />
                <main>
                    <div className="mx-28 mt-16">
                    <div className="text-3xl font-bold">마이 페이지 - 대시보드</div>
                        <div className="w-full flex">
                            <div className={Styles[`dashboard-box`]}>
                                <div className="flex m-5 justify-between" >
                                    <div className={Styles[`box-font`]}>
                                        <div>현재</div>
                                        <div>수강중인</div>
                                        <div>강의</div>
                                    </div>
                                    <div>전체보기 &gt;</div>
                                </div>
                                <div>
                                </div>

                                만약 1개도 존재하지 않으면 수강중인 강의가 없습니다.
                                get으로 강의리스트 가져오고 최신3개까지만 썸네일 가져와서
                                좌측div에 강의썸네일 우측에는 강의제목, 강의예정 시간
                                url링크 걸어서 강의 스튜디오로이동해야함

                            </div>
                            <div className={Styles[`dashboard-box`]}>
                                <div className="flex m-5 justify-between" >
                                    <div className={Styles[`box-font`]}>
                                        <div>수강</div>
                                        <div>완료한</div>
                                        <div>강의</div>
                                    </div>
                                    <div>전체보기 &gt;</div>
                                </div>
                                <div>

                                </div>

                                만약 1개도 존재하지 않으면 수강완료한 강의가 없습니다.
                                get으로 강의리스트 가져오고 최신 완료한 3개까지만 썸네일 가져와서
                                좌측div에 강의썸네일 우측에는 강의제목, 강의완료 날짜
                                url링크 걸어서 강의 스튜디오로이동해야함
                            </div>
                            <div className={Styles[`dashboard-box`]}>
                                <div className={"m-5 " + Styles[`box-font`]}>주간 학습 달성률 컴포넌트</div>
                                <div>

                                    대망의 자바스크립트 차트
                                    <MyPageWeeklyStudyChart />

                                </div>
                                <div>주간 학습 : 이번주 참석 횟수 계산 / 이번주 모든 횟수 계산</div>
                            </div>
                        </div>
                        <div className="m-14">
                            <div>학습 일정</div>
                            <div>
                                <MyPageCalendar />
                            </div>
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