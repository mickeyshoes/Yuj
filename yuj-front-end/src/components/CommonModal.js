import React from 'react';
import StudioSidebar from '../components/StudioSidebar';
import MainHeader from './../components/mainHeader/MainHeader';
import MainFooter from "../components/mainFooter/MainFooter";


/**
 * 모달 컴포넌트
 * 
 * title에는 제목, content에는 내용, buttons에는 버튼 객체의 배열을 넣어주세요
 * button 객체는 { text, className, style, onClickEvent } 로 구성됩니다.
 * 
 * 자세한 사용법은 맨 아래 예제를 참고해주세요.
 *
 */
const CommonModal = ({title, content, buttons=[]}) => {

  return (
    <>
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{content}</p>
                <div className="modal-action">
                {
                    buttons.map((btn, idx) => 
                        <CommonModalBtn 
                            key={idx}
                            text={btn.text}
                            className={btn.className}
                            style={btn.style}
                            onClickEvent={btn.onClickEvent}
                        />
                    )
                }
                </div>
            </div>
        </div>
    </>
  );
}

const CommonModalBtn = ({text, className, style, onClickEvent}) => {
    return (
        <>
            <label htmlFor="my-modal" onClick={() => onClickEvent ? onClickEvent() : null} style={style} className={"btn "+className}>{text}</label>
        </>
    )
}





/**
 * 
 *      사용 예제
 * 
 */

const ModalSamplePage = () => {



    return (
        <>

        {/* 모달의 위치는 헤더 밖으로 빼주세요  */}

            <CommonModal 
                title={'Congratulations random Internet user!'} // 모달에 띄워질 제목
                content={`You've been selected for a chance to get one year of subscription to use Wikipedia for free!`} // 모달에 띄워질 내용
                buttons={[
                    {   
                        text: "Yes", // 버튼 text
                        className: "btn-accent p-10", // 버튼에 추가 적용할 class
                        style: {margin: 10, padding:5}, // 버튼에 추가 적용할 style
                        onClickEvent: () => console.log("Yes Clicked"), // 버튼 클릭시 동작하는 함수
                    },
                    {
                        text: "No",
                        className: "btn-warning p-2 flex",
                        style: {margin: 12, fontSize: 20},
                        onClickEvent: () => console.log("No Clicked"),
                    },
                    {
                        text: "Cancel",
                        className: "btn-primary m-8",
                        style: {margin: 18},
                        onClickEvent: () => console.log("Cancel Clicked"),
                    }
                ]}    
            />

            <MainHeader/>
            <div className='flex'>
                <StudioSidebar/>
                <div>


                {/* 모달을 띄울 버튼 */}

                    <CommonModalBtn text={'모달띄우기'} className={'btn-accent text-white'} style={{padding:10}}/>
                
                
                </div>
            </div>
            <MainFooter/>
        </>
    );
}



export { CommonModal, CommonModalBtn };