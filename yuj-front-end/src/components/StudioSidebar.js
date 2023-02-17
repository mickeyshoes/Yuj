import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateLectureActive, registUserLectureSchedule, getLecture } from '../stores/lectureSlice';
import Styles from './StudioSidebar.module.css';
import { Link, Route } from 'react-router-dom';
import { CommonModal, CommonModalBtn } from '../components/CommonModal';
import { useNavigate, Navigate } from 'react-router-dom';
import { changeStudioLectureDetailItem } from '../stores/studioSlice';

const StudioSidebar = (props) => {

  const {studioDetail, userId, studioLiveLecture} = props;
  const [selectedLectureId, setSelectedLectureId] = useState(-1);

  const user = useSelector(state => state.user);
  const studio = useSelector(state => state.studio);
  const rating = Math.round(studio.studioDetail.rating);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  //강사
  const startLiveClicked = () => {
    console.log('Start Live! : ', { mySessionId: selectedLectureId, myUserName: user.userInfo.nickname, myUserType: '강사' });
    dispatch(updateLectureActive({lectureId: selectedLectureId, active: true, userId: userId}));
    navigate('/viduTeacher', { state: { mySessionId: selectedLectureId, myUserName: user.userInfo.nickname, myUserType: '강사' } }) 
  }

  //수강생
  const goLiveClicked = async() => {
    if(userId == -1) {
      alert("로그인 후 이용해주세요");
      return navigate('/login');
    }
    const userLecture = await checkUserRegistedLecture().catch(err => null);
    if(!userLecture) {
      alert("수강신청 후 이용해주세요");
      return;
    }
    console.log('Go Live! : ', { mySessionId: studioLiveLecture.lectureId, myUserName: user.userInfo.nickname, myUserType: '수강생' });
    dispatch(registUserLectureSchedule({lectureId: studioLiveLecture.lectureId, userId: user.userId}));
    navigate('/viduStudent', { state: { mySessionId: studioLiveLecture.lectureId, myUserName: user.userInfo.nickname, myUserType: '수강생' } }) 
  }
  
  const checkUserRegistedLecture = async() => {
    // const response = await axios.get(`${process.env.REACT_APP_API_URL}/lectures/userLectures?userId=${userId}&lectureId=${studioLiveLecture.lectureId}`);
    const response = await axios.get(`https://i8a504.p.ssafy.io/api/lectures/userLectures?userId=${userId}&lectureId=${studioLiveLecture.lectureId}`);
    console.log("checkUserRegistedLecture", response);
    return response.data;
  }

  // 사이드바 메뉴 추가하려면 아래 입력
  const sidebarMenu = [
    {
      name: "강의 목록",
      path: "/studioLectureListPage",
    },
    {
      name: "공지사항",
      path: "/studio",
    },
    {
      name: "수강 후기",
      path: "/studio/reviews",
    },
  ];

  return (
    <>
        {/* 수강생 버튼 */}
        <CommonModal 
          // title={'실시간 강의에 참여하시겠습니까?'}
          content={'실시간 강의에 참여하시겠습니까?'}
          body={<p className={'mt-4 mb-8 text-accent font-bold w-full '}>{studioLiveLecture.name}</p>} 
          buttons={[
            {
              text: "참여하기",
              className: "btn-accent text-white "+(!studioLiveLecture.name ? 'btn-disabled':''),
              onClickEvent: () => goLiveClicked()
            },
            {
              text: "취소하기",
              className: "btn-primary text-black"
            }
          ]}
          modalId={'studio-go-live'}
        />


        {/* 강사 버튼 */}
        <CommonModal 
          // title={'실시간 강의에 참여하시겠습니까?'} 
          content={'실시간으로 진행할 수업을 선택해주세요'} 
          buttons={[
            {
              text: "수업 시작하기",
              className: "btn-accent text-white "+(selectedLectureId == -1? 'btn-disabled':''),
              onClickEvent: () => startLiveClicked()
            },
            {
              text: "취소하기",
              className: "btn-primary text-black"
            }
          ]}
          modalId={'studio-start-live'}
          body={
            <div className={'flex py-2'}>
              <select
                className="select max-w-md select-sm text-accent"
                onChange={(e) => setSelectedLectureId(e.target.value)}
                value={selectedLectureId}
              >
                <option value={-1} className="bg-info">
                  Select Category
                </option>
                {studio.studioLectureList.map((lecture) => (
                  <option value={lecture.lectureId} key={lecture.lectureId}>
                    {lecture.name}
                  </option>
                ))}
              </select>
            </div>
          }
        />


        <div className="drawer-side">
          <div className={'flex flex-col bg-primary items-center pt-16 '+Styles.studioSidebar}>
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <div className={'cursor-pointer'} onClick={() => navigate('/studio')}>
              <img className={Styles.profileImg} src={`${process.env.REACT_APP_IMAGE_URL}/${studioDetail.profileImagePath}`}/>
            </div>
            <p className={Styles.teacherNickname+' mt-6'}>{studioDetail.nickname}</p>
            <p className={Styles.teacherEmail+' mt-3'}>{studioDetail.email}</p>
            <div className="rating mt-6 rating-sm flex justify-evenly w-24">
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-accent" readOnly checked={rating == 1}/>
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-accent" readOnly checked={rating == 2}/>
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-accent" readOnly checked={rating == 3}/>
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-accent" readOnly checked={rating == 4}/>
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-accent" readOnly checked={rating == 5}/>
            </div>
            {
              studioDetail.userId != userId ?
              <CommonModalBtn text={'Go Live'} className={Styles.liveBtn +' border-none btn-accent mt-12 '+(!studioLiveLecture.name ? 'btn-disabled':'')} modalId={'studio-go-live'}/>
              :
              // <button className={Styles.liveBtn+' btn border-none mt-12 btn-accent'} onClick={() => startLiveClicked()}>Start Live</button>
              <CommonModalBtn text={'Start Live'} className={Styles.liveBtn +' border-none btn-accent mt-12'} modalId={'studio-start-live'}/>
            }
            <ul className={Styles.myPageSidebar+" menu pt-7 text-base-content w-full"} >
              {sidebarMenu.map((menu, index) => {
                return (
                  <li key={index}>
                    <Link to={menu.path} className={Styles.sidebarMenu}>
                      {menu.name}
                    </Link>
                  </li>
                );
              })}

            </ul>
            <img className={Styles.mypageSidebarYujLogo+' mb-10'} src='/assets/mypage-sidebar-yuj-logo.png' alt='yuj sidebar logo' />
          </div>
        </div>
    </>
  );
}

export default StudioSidebar;