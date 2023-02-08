// import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getStudio, createStudio, changeStudioName, changeStudioDesc } from '../stores/studioSlice';
import StudioSidebar from '../components/StudioSidebar';
import MainHeader from './../components/mainHeader/MainHeader';
import MainFooter from "../components/mainFooter/MainFooter";
import StudioMainBanner from '../components/StudioMainBanner';
import StudioMainDescription from '../components/StudioMainDescription';
import ListTitle from '../components/ListTitle';
import LectureItemCard from '../components/LectureItemCard';
import BannerFileInput from '../components/BannerFileInput';
import { CommonModal, CommonModalBtn } from '../components/CommonModal';


const StudioModifyPage = () => {

    const modifyClicked = () => {
        console.log('modify clicked!')
    }

    const moveToListClicked = () => {
        console.log('move to list!')
    }

    return (
        <>
            <CommonModal 
                // title={'Congratulations random Internet user!'} // 모달에 띄워질 제목
                content={`수정하시겠습니까?`} // 모달에 띄워질 내용
                buttons={[
                  {
                    text: "수정하기",
                    className: "btn-accent text-white",
                    onClickEvent: () => modifyClicked()
                  },
                  {
                    text: "취소하기",
                    className: "btn-primary text-black"
                  }
                ]}
                modalId={'studio-modify'}
            />
            
            <MainHeader/>
            <div className={'flex'}>
                <StudioSidebar/>
                <div>
                    <div className={'px-40'}>
                        <div className={'flex mt-20 mb-5'}>
                            <p className={'text-xl font-bold text-accent mr-3'}>배너 이미지</p>
                        </div>
                        <StudioMainBanner/>
                        <div className={'w-full mt-5'}>
                            <BannerFileInput initialLabelText={"'확장자: png, jp,g jpeg / 용량 100MB 이하'"}/>
                        </div>
                        <div className={'mt-28'}>
                            <p className={'text-xl font-bold text-accent mr-3'}>스튜디오 소개글</p>
                        </div>
                        <div className={'mt-5 flex justify-evenly'}>
                            <textarea className="textarea textarea-bordered w-full h-48" placeholder="소개글을 입력해주세요."></textarea>
                            <hr />
                        </div>

                        <hr className={'my-10'}/>

                        <div className={'mb-32 flex justify-end'}>
                            <CommonModalBtn text={'수정하기'} className={'border-none w-32 btn-accent text-white'} modalId={'studio-modify'}/>
                            <button onClick={() => moveToListClicked()} className={'btn border-none w-32 btn-primary ml-5'}>목록으로</button>
                        </div>
                    </div>
                </div>
            </div>
            <MainFooter/>
        </>
    );
}

export default StudioModifyPage;