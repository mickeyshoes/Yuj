// import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getStudio, createStudio, changeStudioName, changeStudioDesc } from '../stores/studioSlice';
import StudioSidebar from '../components/StudioSidebar';
import MainHeader from './../components/mainHeader/MainHeader';
import MainFooter from "../components/mainFooter/MainFooter";


const StudioPage = () => {

    return (
        <>
            <MainHeader/>
            <StudioSidebar/>
            <MainFooter/>
        </>
    );
}

export default StudioPage;