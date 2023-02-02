import React from "react";
import MypageSidebar from './../components/MypageSidebar';
import MainHeader from './../components/mainHeader/MainHeader';
import MainFooter from "../components/mainFooter/MainFooter";


const MyPageLecture = () => {
    return(
        <>
            <MainHeader />
            <div className="flex">
                <MypageSidebar />
                <div>
                    <div>수강목록</div>
                    <div>영상들 주르륵가져오기</div>
                </div>
            </div>
            <MainFooter />
        </>
    );
}

export default MyPageLecture;