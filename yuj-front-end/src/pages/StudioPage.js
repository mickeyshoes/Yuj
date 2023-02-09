import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStudioDetail, getStudioLectureList, getStudioLiveLecture } from '../stores/studioSlice';
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

    useEffect(() => {
        dispatch(getStudioDetail(user.userId));
        dispatch(getStudioLectureList(user.userId));
        dispatch(getStudioLiveLecture(user.userId));
    },[])

    return (
        <>
            <MainHeader/>
            <div className={'flex'}>
                <StudioSidebar studioDetail={studio.studioDetail} userId={user.userId} studioLiveLecture={studio.studioLiveLecture}/>
                <div>
                    <StudioMainBanner studioBannerImage={studio.studioDetail.bannerImage}/>
                    <div className={'px-40'}>
                        <StudioMainDescription studioDetail={studio.studioDetail}/>
                        <ListTitle titleText={'강의 목록'} onClickEvent={() => console.log('강의 목록 clicked!')}/>
                        <div className={'mt-20 my-48  flex justify-evenly'}>
                            {studio.studioLectureList.map((lecture, index) => 
                                index < 3 ? <LectureItemCard key={lecture.lectureId} lecture={lecture}/> : null
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <MainFooter/>
        </>
    );
}

export default StudioPage;