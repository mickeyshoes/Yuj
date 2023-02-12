import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getLecture } from '../stores/lectureSlice';
import { Link } from 'react-router-dom';
import { changeStudioLectureDetailItem } from '../stores/studioSlice';

const LectureItemCard = (props) => {

    const dispatch = useDispatch();

    const lecture = props.thisLecture;

    const thumbnail = './assets/Sample.jpg';

    const teacherProfile = '/assets/YujMainLogo.svg';
    
    // 강의 종료 날짜와 현재 날짜를 비교하여 '완료'를 띄워줄지 체크
    const date = new Date();
    const endDate = new Date(lecture.endDate);

    function complete() {
        if(endDate < date) {
             return <div className='badge badge-outline bg-success p-4 text-xs font-semibold rounded-xl' style={{ color: '#fff', border: '0' }}>완료</div>;
        }
    }

    const yogaCategory = useSelector(state => state.common.yogaCategory);
    function yogaCategorySearch(lecture) {
        for(let i = 0; i < yogaCategory.length; i++) {
            if(yogaCategory[i].yogaId === lecture.yoga.yogaId) {
                return yogaCategory[i].englishName;
            }
        }
    }

    return (
        <div>
            <div className='card w-72 bg-base-100 shadow-xl min-h-full '>
                <figure className='relative'>
                    {/* a 태그는 차후 Link 태그 등으로 교체 */}
                    <Link to="/studioLectureDetailPage" onClick={() => {
                        dispatch(changeStudioLectureDetailItem(lecture));
                    }}>
                        <div className='card-actions absolute top-4 left-6'>
                            <div className='badge badge-outline bg-accent p-4 text-xs font-semibold rounded-xl' style={{ color: '#fff', border: '0' }}>
                                {yogaCategorySearch(lecture)}
                            </div>
                            {complete()}
                        </div>
                        <img src={thumbnail} alt='Card Image' />
                    </Link>
                </figure>
                <div className='card-body'>
                    <div className='flex'>
                        <Link to='' className='flex align-center'>
                            <img className='h-3.5 pr-2' src={teacherProfile} />
                            <div className='text-xs font-bold'>요가소년</div>
                        </Link>
                        <div></div>
                    </div>
                    <p className='text-sm font-bold truncate text-ellipsis'>
                        {/* 글자수 제한 및 대체 기능 구현 */}
                        {lecture.name}
                    </p>
                    <p className='text-xs line-clamp-3 text-ellipsis'>
                        {lecture.description}    
                    </p>

                </div>
            </div>
        </div>
    )
}

export default LectureItemCard