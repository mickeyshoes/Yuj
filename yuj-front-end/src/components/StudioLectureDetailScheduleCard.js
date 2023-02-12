import React from 'react'

const StudioLectureDetailScheduleCard = (props) => {
    const schedule = props.schedule;
    const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
    function dayOfTheWeek(day) {
        for(let i = 1; i <= week.length; i++) {
            if(day === i) return week[i-1];
        }
    };
    const startTime = schedule.startTime.slice(0,-3);
    const endTime = schedule.endTime.slice(0,-3);

    return (
        <div className="card w-40 bg-secondary rounded-lg">
            <div className="card-body p-6">
                <h2 className="card-title text-sm font-bold">{dayOfTheWeek(schedule.day)}</h2>
                <p className='text-sm'>{startTime} - {endTime}</p>
            </div>
        </div>
    )
}

export default StudioLectureDetailScheduleCard