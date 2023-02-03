import React from 'react'
import StudioSidebar from '../components/StudioSidebar';
import LectureDetailCarousel from './../components/lectureDetail/lectureDetailCarousel/LectureDetailCarousel';
import LectureDetailInfoBox from './../components/lectureDetail/lectureDetailInfoBox/LectureDetailInfoBox';
import LectureDetailSchedule from './../components/lectureDetail/lectureDetailSchedule/LectureDetailSchedule';

const TestLectureDetail = () => {
  return (
    <div className='flex w-full'>
      <StudioSidebar />
      <div className='flex-auto'>
        <div className='flex justify-center mt-5'>
          <LectureDetailCarousel />
        </div>
        <div className='flex justify-center mt-5'>
          <LectureDetailInfoBox />
        </div>
        <div className='flex justify-center mt-3'>
          <LectureDetailSchedule />
        </div>
      </div>
    </div>
  )
}

export default TestLectureDetail