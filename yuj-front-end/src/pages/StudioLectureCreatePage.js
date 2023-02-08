import React from 'react'
import StudioSidebar from './../components/StudioSidebar';
import { useNavigate } from 'react-router-dom';
import StudioLectureListCategorySelectBox from '../components/StudioLectureListCategorySelectBox';
import Styles from '../pages/StudioLectureCreatePage.module.css';
import StudioLectureCreateScheduleInput from '../components/StudioLectureCreateScheduleInput';
import StudioLectureCreateImagesInput from '../components/StudioLectureCreateImagesInput';

const StudioLectureCreatePage = () => {
    // useHistory의 기능을 모두 useNavigate가 대체 -> 뒤로가기, 앞으로가기 등
    const navigate = useNavigate();

    return (
        <>
            <div className="flex w-full">
                <StudioSidebar />
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

                        {/* 수업 일정, 수업 인원 */}
                        <div className='my-7'>
                            <StudioLectureCreateScheduleInput />
                        </div>
                        <hr />
                        <div className='text-accent text-lg my-7'>
                            총 수강 정원 &nbsp; <input type='number' max='10' className='input input-primary border-2 w-20 text-right' placeholder='' /> &nbsp; 명
                        </div>
                        <hr />

                        {/* 이미지 파일 업로드 */}
                        <div className='my-7'>
                            <StudioLectureCreateImagesInput />
                        </div>

                        <div className="flex justify-end gap-2 pb-8">
                            <button className="btn btn-accent text-white px-12">개설하기</button>
                            <button className="btn btn-primary px-12" onClick={() => navigate("/studioLectureListPage")}>뒤로가기</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default StudioLectureCreatePage