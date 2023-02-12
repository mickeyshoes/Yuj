import React, { useEffect } from 'react';
import MainFooter from '../components/mainFooter/MainFooter';
import MainHeader from '../components/mainHeader/MainHeader';
import Styles from './MainRouter.module.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home';
import LoginPage from './LoginPage';
import SignUp from './SignUp';
import ViduTeacher from '../utils/FunctionalizedViduTeacher'
import ViduStudent from '../utils/FunctionalizedViduStudent'
import StudioPage from './StudioPage';
import StudioSamplePage from './StudioSamplePage';
import FileInput from '../components/FileInput';
import StudioLectureListPage from './StudioLectureListPage';
import StudioLectureDetailPage from './StudioLectureDetailPage';
import StudioLectureCreatePage from './StudioLectureCreatePage';
import StudioLectureUpdatePage from './StudioLectureUpdatePage';
import UserLivePage from './UserLivePage';
import MyPageInfo from './MyPageInfo';
import MyPageLecture from './MyPageLecture';
import MyPageDashBoard from './MyPageDashBoard';
import StudioModifyPage from './StudioModifyPage';

const Test = () => {
  const location = useLocation();

  useEffect(() => { 
    console.log('경로 : ', location.pathname);
  }, [location])
  return (
    // <div className={Styles.wrapper}>
    <div>
      {location.pathname !== '/viduTeacher' ? location.pathname !== '/viduStudent' ? <MainHeader /> : null : null}
      
      <div className={Styles.contentWrapper}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/viduTeacher' element={<ViduTeacher />} />
          <Route path='/viduStudent' element={<ViduStudent />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/studio" element={<StudioPage />}/>
          <Route path="/studioModify" element={<StudioModifyPage />} />
          <Route path="/mypage/dashboard" element={<MyPageDashBoard />}/>
          <Route path="/mypage/info" element={<MyPageInfo />}/>
          <Route path="/mypage/lecture" element={<MyPageLecture />}/>
          <Route path="/studiosample" element={<StudioSamplePage />} />
          <Route path="/studioLectureListPage" element={<StudioLectureListPage />} />
          <Route path="/studioLectureDetailPage" element={<StudioLectureDetailPage />} />
          <Route path="/studioLectureCreatePage" element={<StudioLectureCreatePage />} />
          <Route path="/studioLectureUpdatePage" element={<StudioLectureUpdatePage />} />
          <Route path="/fileInput" element={<FileInput initialLabelText={'확장자: png, jp,g jpeg / 용량 100MB 이하'} onChangeEvent={(file) => {console.log(file)}}/>} />
          <Route path="/userlive" element={<UserLivePage/>}/>
        </Routes>
      </div> 
      {location.pathname !== '/viduTeacher' ? location.pathname !== '/viduStudent' ? <MainFooter /> : null : null}
      
    </div>
  )
}

export default Test