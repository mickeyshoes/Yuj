import React, { useState } from 'react'
import StudioSidebar from './../components/StudioSidebar';
import { useNavigate } from 'react-router-dom';
import StudioLectureListCategorySelectBox from '../components/StudioLectureListCategorySelectBox';
import Styles from '../pages/StudioLectureCreatePage.module.css';
import StudioLectureCreateScheduleInput from '../components/StudioLectureCreateScheduleInput';
import StudioLectureCreateImagesInput from '../components/StudioLectureCreateImagesInput';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckIcon from '@mui/icons-material/Check';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getStudioDetail, getStudioLectureList, getStudioLiveLecture } from '../stores/studioSlice';

const StudioLectureCreatePage = () => {

    // useHistory의 기능을 모두 useNavigate가 대체 -> 뒤로가기, 앞으로가기 등
    const navigate = useNavigate();
    // 스케줄 입력 컴포넌트 생성을 위한 카운트
    const [addScheduleCnt, setAddSchduleCnt] = useState(1);

    const plusAddSchdulecnt = (e) => {
        setAddSchduleCnt(addScheduleCnt + 1);
    }
    const minusAddSchdulecnt = (e) => {
        if (addScheduleCnt > 1) {
            setAddSchduleCnt(addScheduleCnt - 1);
        }
    }
    // 스케줄 입력 컴포넌트 생성을 위한 함수
    function addSchedules(addScheduleCnt) {
        let addScheduleArr = [];
        for (let i = 1; i <= addScheduleCnt; i++) {
            if (i === 1) {
                addScheduleArr.push(
                    <div className='flex items-center gap-3 mb-5' key={i}>
                        <div className='w-full'>
                            <StudioLectureCreateScheduleInput />
                        </div>
                        <CheckIcon
                            className="text-accent"
                            style={{ fontSize: "xx-large" }}
                        />
                    </div>
                )
            } else if (i !== addScheduleCnt) {
                addScheduleArr.push(
                    <div className='flex items-center gap-3 mb-5' key={i}>
                        <div className='w-full'>
                            <StudioLectureCreateScheduleInput />
                        </div>
                        <CheckIcon
                            className="text-accent"
                            style={{ fontSize: "xx-large" }}
                        />
                    </div>
                )
            } else {
                addScheduleArr.push(
                    <div className='flex items-center gap-3 mb-5' key={i}>
                        <div className='w-full'>
                            <StudioLectureCreateScheduleInput />
                        </div>
                        <DeleteForeverIcon
                            className="text-accent hover:cursor-pointer hover:text-success"
                            style={{ fontSize: "xx-large" }}
                            onClick={minusAddSchdulecnt}
                        />
                    </div>
                )
            }
        };
        return addScheduleArr;
    }

    //사이드바
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const studio = useSelector(state => state.studio);
    useEffect(() => {
        dispatch(getStudioDetail(user.userId));
        dispatch(getStudioLectureList(user.userId));
        dispatch(getStudioLiveLecture(user.userId));
    }, [])


    return (
        <>
            <div className="flex w-full">
                <StudioSidebar studioDetail={studio.studioDetail} userId={user.userId} studioLiveLecture={studio.studioLiveLecture}/>
                <div className="px-40 flex-auto overflow-hidden">
                    <form className="w-full mt-16">
                        {/* 재활용 */}
                        <div className='mb-3'>
                            <StudioLectureListCategorySelectBox />
                        </div>

                        {/* 강의 타이틀, 소개글 */}
                        <div className="w-full">
                            <input type="text" className={Styles.focusNone + " input input-ghost input-lg w-full px-4"} placeholder="개설할 강좌명을 입력해 주세요." />
                            <hr />
                            <textarea className={Styles.focusNone + " textarea textarea-bordered w-full my-7"} rows={7} placeholder="강좌에 대한 설명을 입력해 주세요."></textarea>
                            <hr />
                        </div>

                        {/* 수업 일정 */}
                        <div className='my-7'>
                            <div className="flex items-center mb-4">
                                <p className="text-lg text-success">수업 일정</p>
                                <AddCircleIcon className="ml-2 text-accent hover:cursor-pointer hover:text-success" onClick={plusAddSchdulecnt} />
                            </div>
                            {addSchedules(addScheduleCnt)}
                        </div>
                        <hr />

                        {/* 수강 정원 */}
                        <div className='text-accent text-lg my-7'>
                            총 수강 정원 &nbsp; <input type='number' max='10' className='input input-primary border-2 w-20 text-right' placeholder='' /> &nbsp; 명
                        </div>
                        <hr />

                        {/* 이미지 파일 업로드 */}
                        <div className='my-7'>
                            <StudioLectureCreateImagesInput />
                        </div>

                        <div className="flex justify-end gap-2 pb-8">
                            {/* 타입을 명확히 지정해 주지 않으면 submit과 혼동이 있을 수 있음 */}
                            <button type='submit' className="btn btn-accent text-white px-12">개설하기</button>
                            <button type='button' className="btn btn-primary px-12" onClick={() => navigate("/studioLectureListPage")}>뒤로가기</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default StudioLectureCreatePage