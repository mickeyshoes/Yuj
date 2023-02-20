import React, { useEffect, useState } from "react";
import MyPageSidebar from "../components/MyPageSidebar";
import Styles from "./MyPages.module.css";
import MyPageWeeklyStudyChart from '../components/MyPageWeeklyStudyChart';
import MyPageCalendar from "../components/MyPageCalendar";
import axios from "axios";
import { Link, } from 'react-router-dom';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeStudioLectureDetailItem } from "../stores/studioSlice";
import { getLecture } from "../stores/lectureSlice";
const MyPageDashBoard = () => {

    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    //신청한 모든 강의 정보
    const [allLectures, setAllLectures] = useState([]);
    //신청한 모든 수강신청 정보
    const [allUserLectures, setAllUserLectures] = useState([]);
    //현재 수강중인 강의
    const [currentLectures, setCurrentLectures] = useState([]);
    //수강 완료한 강의
    const [completedLectures, setCompletedLectures] = useState([]);
    //강의 시간 정보
    const [lectureSchedule, setLectureSchedule] = useState([]);
    //강의 일정 배열(1일 단위)
    const [lectureEvents, setLectureEvents] = useState([]);
    //수강 참여 내역
    const [userLectureSchedules, setUserLectureSchedules] = useState([]);
    //이번주 강의 수강 퍼센트
    const [percentage, setPercentage] = useState(50);
    //이번주 강의 참여 횟수
    const [maxAttandance, setMaxAttandance] = useState(0);
    //이번주 강의 참여 횟수 최대치
    const [currAttandance, setCurrAttandance] = useState(0);
    // 현재 수강중인 강의 가져왔는지 확인
    const [currentLecturesLoading, setCurrentLecturesLoading] = useState(false);
    // 수강 완료한 강의 잘 가져왔는지 확인
    const [completedLecturesLoading, setCompletedLecturesLoading] = useState(false);

    useEffect(() => {
        if(user.userId === -1){
            navigate('/login');
        }
    },[])

    // HH:MM:SS 시간 표시를 HH:MM으로 표시하는 함수
    function convertToHM(time) {
        let [hours, minutes, _] = time.split(":");
        return `${hours}:${minutes}`;
    }

    const LOCAL_URL = process.env.REACT_APP_API_URL;

    const URL = LOCAL_URL;

    const loginUserId = user.userId
    // backend URL
    const GET_ALL_LECTURES_USERID = `${URL}/mypage/dashboard/${loginUserId}` //뒤에 유저Id입력
    const GET_CURRENT_LECTURES = `${URL}/mypage/dashboard/currentlectures/${loginUserId}` //뒤에 유저Id입력
    const GET_COMPLETED_LECTURES = `${URL}/mypage/dashboard/completedlectures/${loginUserId}` //뒤에 유저Id입력
    // const LECTURE_SCHEDULE_URL = `${URL}/mypage/dashboard/lectureSchedule/${loginUserId}` // 2/15 쓸필요없어보임 4:12 문제 없으면 삭제 예정

    //이번주 수강 퍼센트 계산하는 함수
    const calcPercentage = () => {
        const weekStart = dayjs().startOf('week');
        const weekEnd = dayjs().endOf('week');

        console.log("week start & end : ", weekStart.format(), weekEnd.format());

        let maxCnt = 0;
        let currCnt = 0;

        lectureEvents.forEach(event => {
            const classDate = dayjs(event.date);
            const isAfter = classDate.isSame(weekStart) || classDate.isAfter(weekStart);
            const isBefore = classDate.isSame(weekEnd) || classDate.isBefore(weekEnd);

            if (isAfter && isBefore) {
                maxCnt++;
            }
        })
        // console.log('calcPercentage userLectureSchedules: ',userLectureSchedules);
        userLectureSchedules.forEach(schedule => {
            const classDate = dayjs(schedule.attendanceDate);
            const isAfter = classDate.isSame(weekStart) || classDate.isAfter(weekStart);
            const isBefore = classDate.isSame(weekEnd) || classDate.isBefore(weekEnd);

            if (isAfter && isBefore) {
                currCnt++;
            }
        })

        setMaxAttandance(maxCnt);
        setCurrAttandance(currCnt);

        console.log('maxcnt, currcnt : ', maxCnt, currCnt)

        setPercentage(maxCnt != 0 ? Math.round(currCnt / maxCnt * 100) : 100);
    }


    useEffect(() => {
        if (currentLectures.length != 0 || completedLectures.length != 0) {
            //강의 일정 만들기
            makeLectureEvents();
        }
    }, [currentLectures, completedLectures])

    useEffect(() => {
        if (lectureEvents.length != 0) {
            //그래프 퍼센트 계산하기
            calcPercentage();
        }
    }, [lectureEvents, userLectureSchedules])


    //현재 수강중인 모든 강의 일정을 계산해 합치는 함수
    const makeLectureEvents = async () => {
        let events = [];
        for (const lecture of [...currentLectures, ...completedLectures]) {
            const schedules = await getLectureScheduleByLectureId(lecture.lectureId);
            const { calcEvents, calcEventCloseTime, timeDiff } = calcEventsWithUserLectureAndSchedules(lecture, schedules);
            events = events.concat(calcEvents);
            lecture.closeTime = calcEventCloseTime;
            lecture.timeDiff = timeDiff;
            console.log("foreach lecture res: ", lecture)
            events['lectureId']=lecture.lectureId;
            events[`userId`]=lecture.userId;
        }
        setLectureEvents(events);
    }

    //특정 강의와 스케줄을 가지고 일정을 생성하는 함수
    const calcEventsWithUserLectureAndSchedules = (userLecture, schedules) => {
        console.log("calcEventsWithUserLectureAndSchedules : ", userLecture, schedules)
        const calcEvents = [];
        let calcEventCloseTime = '';
        let timeDiff = 0;


        //시작날, 끝날, 수업요일 저장하기
        let { endDate, startDate, name } = userLecture;
        const days = schedules.map(schedule => schedule.day - 1);
        console.log('days : ', days)

        endDate = dayjs(endDate);
        startDate = dayjs(startDate);

        //시작날부터 끝날까지 날짜를 1씩 추가하며 해당날짜가 수업하는 요일일 경우 배열에 집어넣기
        while (!startDate.isAfter(endDate)) {
            startDate = startDate.add(1, "d");
            schedules.map(schedule => {

                if (schedule.day - 1 == startDate.get("day")) {
                    calcEvents.push({
                        title: name,
                        date: startDate.format("YYYY-MM-DD"),
                    })

                    if (!calcEventCloseTime) {
                        let getEventDateTime = startDate.format("YYYY-MM-DD") + schedule.startTime;
                        let calcRes = elapsedTime(getEventDateTime);
                        calcEventCloseTime = calcRes.calcEventCloseTime;
                        timeDiff = calcRes.timeDiff;
                    }
                }
            })
        }
        return { calcEvents, calcEventCloseTime, timeDiff };
    }

    //~분전, ~일전 계산하는 함수
    function elapsedTime(date) {
        const start = dayjs();
        const end = dayjs(date);

        const diff = end.diff(start) / 1000;

        if(diff < 0) return '';

        const times = [
            { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
            { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
            { name: '일', milliSeconds: 60 * 60 * 24 },
            { name: '시간', milliSeconds: 60 * 60 },
            { name: '분', milliSeconds: 60 },
        ];

        for (const value of times) {
            const betweenTime = Math.floor(diff / value.milliSeconds);

            if (betweenTime > 0) {
                return { calcEventCloseTime: `${betweenTime}${value.name} 후`, timeDiff: diff };
            }
        }
        return { calcEventCloseTime: '잠시 후', timeDiff: diff };
    }


    useEffect(() => {
        // 수강했던 모든 강의 가져와야하는부분 현재 임시
        axios({
            method: "GET",
            url: GET_ALL_LECTURES_USERID
        }).then(response => {
            setAllUserLectures(response.data)
        })
            .catch(error => {
                console.log(error.response);
            })

        //수강 중인 강의 가져와야하는부분 현재 임시데이터
        axios({
            method: "GET",
            url: GET_CURRENT_LECTURES
        }).then(response => {
            setCurrentLectures(response.data)
        })
            .catch(error => {
                console.log(error.response);
            }).finally(() =>{
                setCurrentLecturesLoading(true);
            })

        //수강 완료한 강의 가져와야하는부분 현재 임시데이터
        axios({
            method: "GET",
            url: GET_COMPLETED_LECTURES
        }).then(response => {
            setCompletedLectures(response.data)
        })
            .catch(error => {
                console.log(error.response);
            }).finally(() =>{
                setCompletedLecturesLoading(true);
            })

        //수강중인 강의의 정보를 가져오는 api
        axios({
            method: "GET",
            url: `${URL}/lectures/myPage/lectures`, //u
            params: {
                userId: user.userId,
            }
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

            setAllLectures(sortedLectures);
            console.log("get all lectures on mypage : ",sortedLectures);
        })
            .catch(e => {
                console.log(e);
            });
        // 강의 시작 정보 구하기 위한것
        // 2/15 16:12 useEffect에서 처리할것은 아닌것같아 주석처리  문제없으면 삭제 예정
        // axios({
        //     method: "GET",
        //     url: LECTURE_SCHEDULE_URL
        // }).then(response => {
        //     setLectureSchedule(response.data);
        // })
        //     .catch(e => {
        //         console.log(e.response);
        //     })

        // 강의 몇번 수강했는지 내역 가져오기
        getUserLectureScheduleByUserId(user.userId)
            .then(res => setUserLectureSchedules(res));
        // setUserLectureSchedules(getUserLectureScheduleByUserId(0));
    }, [])


    //강의id로 해당 스케줄 목록 가져오는 api 함수
    const getLectureScheduleByLectureId = (lectureId) => {
        return axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/mypage/dashboard/lectureSchedule/${lectureId}`
        })
            .then(response => {
                return response.data;
            })
            .catch(e => {
                console.log(e.response);
            })
    }

    //유저id로 강의 참여 내역을 가져오는 api 함수
    const getUserLectureScheduleByUserId = (userId) => {
        return axios({
            method: "GET",
            // url: `${process.env.REACT_APP_API_URL}/mypage/dashboard/userlectureSchedule/${userId}`
            url: `https://i8a504.p.ssafy.io/api/mypage/dashboard/userLectureSchedule/${userId}`
        })
            .then(response => {
                console.log('getUserLectureScheduleByUserId : ', response.data)
                return response.data;
            })
            .catch(e => {
                console.log(e.response);
            })
    }

    const dashboardItemClicked = (lectureId) => {              
        let clickedLecture = null;
        allLectures.forEach(lecture => {
            if(lecture.lectureId == lectureId){
                console.log("move to detail in mypage : ",lecture)
                clickedLecture = lecture;
            }
        })
        clickedLecture ? dispatch(changeStudioLectureDetailItem(clickedLecture)) : alert("잘못된 요청입니다.");
    }

    return (
        <>
            <div className="flex w-full">
                <MyPageSidebar />
                <main>
                    <div className="mx-28 mt-16 w-full">
                        <div className="text-3xl font-bold ml-4 text-accent">대시보드</div>
                        <div className="max-w-5xl flex justify-between">
                            <div className={Styles[`dashboard-box`] + " flex flex-col"}>
                                <div className="flex m-5 " >

                                    <div className={Styles[`box-font`]}>
                                        <div className="text-accent">수강중</div>
                                    </div>
                                    {/* <Link to="/mypage/lecture">전체보기 &gt;</Link> */}
                                </div>
                                <div className="flex-auto">
                                    {console.log("대시보드 커렌트렉쳐")}
                                        {console.log(currentLectures)}
                                    {
                                        completedLecturesLoading === true ?
                                        completedLectures.length === 0
                                            ? <div className="h-full flex flex-col items-center justify-center pb-16">
                                                <h1 className="text-3xl font-bold mb-4">진행중인</h1>
                                                <h1 className="text-3xl font-bold mb-4">강의가 없습니다</h1>
                                                <Link to="/searchLecture" className="btn btn-primary">강의 둘러보기</Link>
                                            </div>
                                            : <div>{currentLectures.slice(0, 3).sort((a, b) => a.timeDiff - b.timeDiff).map((post, idx) => (
                                                <div key={idx}>
                                                    <Link to="/studioLectureDetailPage" onClick={() => dashboardItemClicked(post.lectureId)} className="h-20 my-2 flex">
                                                        <div className="flex-none ml-5 mr-3 mt-2">
                                                            {/* 강의 thumbnail_image */}
                                                            <img className="rounded object-cover overflow-hidden" style={{width: "75px", height: "48px"}} src={`${process.env.REACT_APP_IMAGE_URL}/${post.thumbnailImage}`}></img>
                                                        </div>
                                                        {/* 강의 name */}
                                                        <div className="flex-1 mr-2 leading-loose truncate">{post.name}
                                                            {console.log(lectureSchedule)}
                                                            <div className="break-keep">예정 : {post.closeTime ? post.closeTime : null} </div>
                                                        </div>
                                                    </Link>
                                                </div >
                                            ))}
                                            </div>
                                            : null
                                    }
                                </div>

                            </div>
                            <div className={Styles[`dashboard-box`] + " flex flex-col"}>
                                <div className="flex m-5 " >
                                    <div className={Styles[`box-font`]}>
                                        <div className="text-accent">수강 완료</div>
                                    </div>
                                    {/* <Link to="/mypage/lecture">전체보기 &gt;</Link> */}

                                </div>
                                <div className="flex-auto">
                                    {
                                        completedLecturesLoading === true ?
                                        completedLectures.length === 0
                                            ? <div className="h-full flex flex-col items-center justify-center pb-16">
                                                <h1 className="text-3xl font-bold mb-4">완료된</h1>
                                                <h1 className="text-3xl font-bold mb-4">강의가 없습니다</h1>
                                                <Link to="/searchLecture" className="btn btn-primary">강의 둘러보기</Link>
                                            </div>
                                            : <div>{completedLectures
                                                .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))  //가장 최근 수강완료된것부터 정렬
                                                .slice(0, 3)
                                                .map((post, idx) => (
                                                    <div key={idx}>
                                                        {/* 실제로는 studio링크가 아닌 해당 강의 스튜디오로 이동하게 짜야함. */}
                                                        <Link to="/studioLectureDetailPage" onClick={() => dashboardItemClicked(post.lectureId)} className="h-20 my-2 flex">
                                                            <div className="flex-none ml-5 mr-3 mt-2">
                                                                {/* src를 가져온 강의의 thumbnail_image로 */}
                                                                <img className="rounded object-cover overflow-hidden" style={{width: "75px", height: "48px"}} src={`${process.env.REACT_APP_IMAGE_URL}/${post.thumbnailImage}`} alt="Lecture thumbnail" />
                                                            </div>
                                                            {/* 강의 name */}
                                                            <div className="flex-1 mr-2 leading-loose truncate">
                                                                {post.name}
                                                                {/* 강의 end_date */}
                                                                <div>완료일 : {post.endDate}</div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ))
                                            }
                                            </div>
                                            : null
                                    }
                                </div>

                            </div>
                            <div className={Styles[`dashboard-box`]}>
                                <div className={"pl-5 pt-5 text-accent " + Styles[`box-font`]}>주간 학습 달성률</div>
                                <div>
                                    <MyPageWeeklyStudyChart centerImage={`${process.env.REACT_APP_IMAGE_URL}/${user.userInfo.profileImage}`} percentage={percentage} />
                                </div>
                                <div className="pl-5">
                                    {currAttandance} / {maxAttandance}회 참여하였습니다.
                                </div>
                            </div>
                        </div>
                        <div className="px-5 my-16">
                            <div className={"text-accent " + Styles[`box-font`]}>학습 일정</div>
                            <div className={'max-w-5xl'}>
                                <MyPageCalendar lectureEvents={lectureEvents} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default MyPageDashBoard;