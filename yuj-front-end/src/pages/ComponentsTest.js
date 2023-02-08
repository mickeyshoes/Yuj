import React, { useEffect } from 'react';
import MainFooter from '../components/mainFooter/MainFooter';
import MainHeader from '../components/mainHeader/MainHeader';
import Styles from '../pages/ComponentsTest.module.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignIn from './Signin';
import ViduTeacher from '../utils/FunctionalizedViduTeacher'
import ViduStudent from '../utils/FunctionalizedViduStudent'
import StudioPage from './StudioPage';
import StudioSamplePage from './StudioSamplePage';
import TestLectureCard from './TestLectureCard(삭제예정)';
import TestLectureDetail from './TestLectureDetail(삭제예정)';
import FileInput from '../components/FileInput';
import StudioLectureListPage from './StudioLectureListPage';
import StudioLectureDetailPage from './StudioLectureDetailPage';
import StudioLectureCreatePage from './StudioLectureCreatePage';
import StudioLectureUpdatePage from './StudioLectureUpdatePage';
import UserLivePage from './UserLivePage';

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
            <Route path="/login" element={<Login />} />
          <Route path='/viduTeacher' element={<ViduTeacher />} />
          <Route path='/viduStudent' element={<ViduStudent />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/studiosample" element={<StudioSamplePage />} />
          <Route path="/studioLectureListPage" element={<StudioLectureListPage />} />
          <Route path="/studioLectureDetailPage" element={<StudioLectureDetailPage />} />
          <Route path="/studioLectureCreatePage" element={<StudioLectureCreatePage />} />
          <Route path="/studioLectureUpdatePage" element={<StudioLectureUpdatePage />} />
          {/* <Route path="/testLecturecard" element={<TestLectureCard />} />
          <Route path="/testLectureDetail" element={<TestLectureDetail />} /> */}
          <Route path="/fileInput" element={<FileInput initialLabelText={'확장자: png, jp,g jpeg / 용량 100MB 이하'} onChangeEvent={(file) => {console.log(file)}}/>} />
          <Route path="/userlive" element={<UserLivePage/>}></Route>
        </Routes>
      </div> 
      {location.pathname !== '/viduTeacher' ? location.pathname !== '/viduStudent' ? <MainFooter /> : null : null}
      
    </div>
  )
}

export default Test