import React from 'react';
import MainFooter from '../components/mainFooter/MainFooter';
import MainHeader from '../components/mainHeader/MainHeader';
import Styles from '../pages/ComponentsTest.module.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import TestLectureCard from './TestLectureCard';
import TestLectureDetail from './TestLectureDetail';

const Test = () => {
  return (
    <div className={Styles.wrapper}>
      <MainHeader />
      <div className={Styles.contentWrapper}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testLecturecard" element={<TestLectureCard />} />
          <Route path="/testLectureDetail" element={<TestLectureDetail />} />
        </Routes>
      </div>
      <MainFooter />
    </div>
  )
}

export default Test