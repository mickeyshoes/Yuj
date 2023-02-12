import React from 'react'

const StudioLectureDetailInfoBox = (props) => {

    const lecture = props.lecture;
    const category = lecture.yoga.englishName;
    const title = lecture.name;
    const content = lecture.description;

    // 강의 종료 상태를 내려받아 '완료'를 띄워줄지 체크
    const endCheck = props.endCheck;
    function complete() {
        if(endCheck) {
             return <div className='badge badge-outline bg-success px-6 py-4 mb-3 text-sm font-semibold rounded-lg' style={{ color: '#fff', border: '0' }}>완료</div>;
        }
    }

    return (
        <div>
            <div className='badge badge-outline bg-accent px-6 py-4 mb-3 text-sm font-semibold rounded-lg mr-2' style={{ color: '#fff', border: '0' }}>{category}</div>{complete()}
            <p className='text-xl font-bold text-accent mb-6'>{title}</p>
            <p className='text-sm whitespace-pre-wrap mx-3'>&nbsp;&nbsp;{content}</p>
        </div>
    )
}

export default StudioLectureDetailInfoBox