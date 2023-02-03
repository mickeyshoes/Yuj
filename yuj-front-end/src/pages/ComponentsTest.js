import React from 'react';
import MainFooter from '../components/mainFooter/MainFooter';
import MainHeader from '../components/mainHeader/MainHeader';
import Styles from '../pages/ComponentsTest.module.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignIn from './Signin';
import StudioPage from './StudioPage';
import StudioSamplePage from './StudioSamplePage';
import TestLectureCard from './TestLectureCard';
import TestLectureDetail from './TestLectureDetail';
import FileInput from '../components/FileInput';

const Test = () => {
  return (
    <div className={Styles.wrapper}>
      <MainHeader />
      <div className={Styles.contentWrapper}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/studiosample" element={<StudioSamplePage />} />
          <Route path="/testLecturecard" element={<TestLectureCard />} />
          <Route path="/testLectureDetail" element={<TestLectureDetail />} />
          <Route path="/fileInput" element={<FileInput />} />
        </Routes>
      </div>
      <MainFooter />
    </div>
  )
}

export default Test