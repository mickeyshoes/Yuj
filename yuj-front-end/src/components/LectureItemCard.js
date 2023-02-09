import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getLecture } from '../stores/lectureSlice';

const LectureItemCard = (props) => {

    const lecture = props.thisLecture;

    return (
        <div>
            <div className='card w-72 bg-base-100 shadow-xl'>
                <figure className='relative'>
                    {/* a 태그는 차후 Link 태그 등으로 교체 */}
                    <a href=''>
                        <div className='card-actions absolute top-4 left-6'>
                            <div className='badge badge-outline bg-accent p-4 text-xs font-semibold rounded-xl' style={{ color: '#fff', border: '0' }}>Raja</div>
                            <div className='badge badge-outline bg-success p-4 text-xs font-semibold rounded-xl' style={{ color: '#fff', border: '0' }}>완료</div>
                        </div>
                        <img src='{thumbnail}' alt='Card Image' />
                    </a>
                </figure>
                <div className='card-body'>
                    <div className='flex'>
                        <a href='' className='flex align-center'>
                            <img className='h-3.5 pr-2' src='/assets/YujMainLogo.svg' />
                            <div className='text-xs font-bold'>요가소년</div>
                        </a>
                        <div></div>
                    </div>
                    <p className='text-sm font-bold truncate text-ellipsis'>
                        {/* 글자수 제한 및 대체 기능 구현 */}
                        {/* {lecture.name} */}
                    </p>
                    <p className='text-xs line-clamp-3 text-ellipsis'>
                        {/* {lecture.description}     */}
                    </p>

                </div>
            </div>
        </div>
    )
}

export default LectureItemCard