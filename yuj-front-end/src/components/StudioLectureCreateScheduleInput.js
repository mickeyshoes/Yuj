import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const StudioLectureCreateScheduleInput = () => {

    const schedule =
        <div className='flex gap-3 items-center'>
            <select className="select flex-auto max-w-xs bg-primary">
                <option disabled selected>요일</option>
                <option>Homer</option>
                <option>Marge</option>
                <option>Bart</option>
                <option>Lisa</option>
                <option>Maggie</option>
            </select>
            <select className="select flex-auto max-w-xs bg-primary">
                <option disabled selected>시작</option>
                <option>Homer</option>
                <option>Marge</option>
                <option>Bart</option>
                <option>Lisa</option>
                <option>Maggie</option>
            </select>
            <select className="select flex-auto max-w-xs bg-primary">
                <option disabled selected>종료</option>
                <option>Homer</option>
                <option>Marge</option>
                <option>Bart</option>
                <option>Lisa</option>
                <option>Maggie</option>
            </select>
            <DeleteForeverIcon className='text-accent' style={{fontSize:"xx-large"}}/>
        </div>


    return (
        <>
            <div className='flex items-center mb-4'>
                <p className='text-lg text-accent'>수업 일정</p>
                <AddCircleIcon className='ml-2 text-accent' />
            </div>
            {schedule}
        </>
    )
}

export default StudioLectureCreateScheduleInput