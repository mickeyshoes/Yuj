import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStudioDetail, getStudioLectureList, getStudioLiveLecture } from '../stores/studioSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import StudioSidebar from '../components/StudioSidebar';
import MainHeader from './../components/mainHeader/MainHeader';
import MainFooter from "../components/mainFooter/MainFooter";
import StudioMainBanner from '../components/StudioMainBanner';
import StudioMainDescription from '../components/StudioMainDescription';
import ListTitle from '../components/ListTitle';
import LectureItemCard from '../components/LectureItemCard';


const StudioPage = () => {

    const user = useSelector(state => state.user);
    const studio = useSelector(state => state.studio);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log(location.state);
        if(location.state != null){
            getStudioData(location.state.teacherId);
        }else if(studio.studioDetail.studioId == null) {
            navigate(-1);
        }
    },[location.state]) //추적이 안되고 있어 location.state 추가

    const getStudioData = (teacherId) => {
        dispatch(getStudioDetail(teacherId));
        dispatch(getStudioLectureList(teacherId));
        dispatch(getStudioLiveLecture(teacherId));
    }

    return (
        <>
            <div className={'flex w-full'}>
                <StudioSidebar studioDetail={studio.studioDetail} userId={user.userId} studioLiveLecture={studio.studioLiveLecture}/>
                <div>
                    <StudioMainBanner studioBannerImage={studio.studioDetail.bannerImage}/>
                    <div className={'px-40'}>
                        <StudioMainDescription studioDetail={studio.studioDetail}/>
                        <ListTitle className={'text-2xl font-bold'} titleText={'강의 목록'} onClickEvent={() => { navigate("/studioLectureListPage")}}/>
                        <div className={'mt-12 my-48  flex justify-evenly'}>
                            {studio.studioLectureList.map((lecture, index) => 
                                index < 3 ? <LectureItemCard key={lecture.lectureId} thisLecture={lecture}/> : null
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudioPage;