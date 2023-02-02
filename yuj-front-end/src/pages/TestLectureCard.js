import React from 'react'
import LectureItemCard from './../components/lectureItemCard/LectureItemCard';

const TestLectureCard = () => {
  return (
    <div className='py-7'>
      <div>
        <div className='flex flex-wrap justify-start gap-5'>
          <LectureItemCard className='flex-none p-3'/>
          <LectureItemCard className='flex-none' />
          <LectureItemCard className='flex-none' />
          <LectureItemCard className='flex-none' />
          <LectureItemCard className='flex-none' />
          <LectureItemCard className='flex-none' />
        </div>
      </div>
    </div>
  )
}

export default TestLectureCard