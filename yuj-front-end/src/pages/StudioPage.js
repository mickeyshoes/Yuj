// import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getStudio, createStudio, changeStudioName, changeStudioDesc } from '../stores/studioSlice';
import StudioSidebar from '../components/StudioSidebar';
import MainHeader from './../components/mainHeader/MainHeader';
import MainFooter from "../components/mainFooter/MainFooter";
import StudioMainBanner from '../components/StudioMainBanner';
import StudioMainDescription from '../components/StudioMainDescription';
import ListTitle from '../components/ListTitle';
import LectureItemCard from '../components/lectureItemCard/LectureItemCard';


const StudioPage = () => {

    return (
        <>
            <MainHeader/>
            <div className={'flex'}>
                <StudioSidebar/>
                <div>
                    <StudioMainBanner/>
                    <div className={'px-40'}>
                        <StudioMainDescription/>
                        <ListTitle titleText={'강의 목록'} onClickEvent={() => console.log('강의 목록 clicked!')}/>
                        <div className={'mt-28 flex justify-evenly'}>
                            <LectureItemCard />
                            <LectureItemCard />
                            <LectureItemCard />
                        </div>
                    </div>
                </div>
            </div>
            <MainFooter/>
        </>
    );
}

export default StudioPage;