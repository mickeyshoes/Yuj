import React from 'react'
import LectureDetailCarousel from './../components/lectureDetail/lectureDetailCarousel/LectureDetailCarousel';
import LectureDetailInfoBox from './../components/lectureDetail/lectureDetailInfoBox/LectureDetailInfoBox';
import LectureDetailSchedule from './../components/lectureDetail/lectureDetailSchedule/LectureDetailSchedule';

const TestLectureDetail = () => {
  return (
    <div>
      <div className='flex justify-center'>
        <LectureDetailCarousel />
      </div>
      <div>
        <LectureDetailInfoBox />
      </div>
      <div>
        <LectureDetailSchedule />
      </div>
    </div>
  )
}

export default TestLectureDetail