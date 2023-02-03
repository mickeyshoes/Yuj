import React, { useEffect } from 'react';
import MainFooter from '../components/mainFooter/MainFooter';
import MainHeader from '../components/mainHeader/MainHeader';
import Styles from '../pages/ComponentsTest.module.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignIn from './Signin';
import Vidu from '../utils/FunctionalizedVidu'
import StudioPage from './StudioPage';
import StudioSamplePage from './StudioSamplePage';
import TestLectureCard from './TestLectureCard';
import TestLectureDetail from './TestLectureDetail';
import FileInput from '../components/FileInput';

const Test = () => {
  const location = useLocation();

  useEffect(() => { 
    console.log('경로 : ', location.pathname);
  }, [location])
  return (
    // <div className={Styles.wrapper}>
    <div>
      {location.pathname !== '/vidu' ? <MainHeader /> : null}
      <div className={Styles.contentWrapper}>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path='/vidu' element={<Vidu />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/studiosample" element={<StudioSamplePage />} />
          <Route path="/testLecturecard" element={<TestLectureCard />} />
          <Route path="/testLectureDetail" element={<TestLectureDetail />} />
          <Route path="/fileInput" element={<FileInput />} />
        </Routes>
      </div> 
      {location.pathname !== '/vidu' ? <MainFooter /> : null}
    </div>
  )
}

export default Test