import React from "react";
import MyPageSidebar from './../components/MyPageSidebar';
import Styles from './MyPages.module.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LOCAL_URL = "http://localhost:5000";
const URL = LOCAL_URL;

//핸드폰 번호를 11자로 제한하기 위한 함수
function phoneLengthLimit(e) {
    const target = e.target;
    //target.value.length = input에서 받은 value의 길이
    target.maxLength = 11;
    if (target.value.length > target.maxLength) {
        target.value = target.value.slice(0, target.maxLength);
    }
}

const MyPageInfo = () => {

    //현재 로그인한 유저
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if(user.userId === -1){
            navigate('/login');
        }
    },[])

    // 내 정보의 input상자 클래스를 한번에 관리하기 위한 inputClassName
    const inputClassName = "rounded-[5px] pl-2 h-6 input-bordered w-full text-base " + Styles[`myPageInput`];

    console.log("유저입니다.");
    console.log(user);
    const [profileImage, setProfileImage] = useState(user.userInfo.profileImage);
    const [nickname, setNickname] = useState(user.userInfo.nickname);
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState(user.userInfo.phone);
    const [email, setEmail] = useState(user.userInfo.email);
    const [userId, setUserId] = useState(user.userId);

    const handleSubmit = (event) => {
        event.preventDefault();

        const myPageUserInfoRequestDTO = {
            userId,
            profileImage,
            nickname,
            password,
            phone,
            email,
        };
        console.log("url")
        console.log(myPageUserInfoRequestDTO)
        const headers = user.tokenInfo
        console.log('헤더입니다.')
        console.log(headers)
        console.log(`${LOCAL_URL}/mypage/info/${userId}`)
        axios.patch(`${LOCAL_URL}/mypage/info/${userId}`, myPageUserInfoRequestDTO, headers)
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
    };


    return (
        <>
            <div className="flex w-full ">
                <MyPageSidebar />
                <div className="px-40 w-full">
                    <div className={"flex " + Styles[`info-background-image`]} >

                        <form className={"p-10 card bg-base-200 " + Styles[`info-container`]} onSubmit={handleSubmit}>
                            <input type="hidden" name="userId" value={userId} />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">프로필 이미지</span>
                                </label>
                                <div className="avatar">
                                    <div className="w-24 rounded-full">
                                        {/* 현재 로그인한 유저의 이미지 */}
                                        <img src={`${process.env.REACT_APP_IMAGE_URL}/${profileImage}`} />
                                    </div>
                                    <input type="file" name="profileImage" accept="image/*" className={"block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 " + Styles.profileInput + " " + Styles.myPageInput} onChange={(e) => setProfileImage(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-control w-full max-w-full">
                                <label className="label">
                                    <span className="label-text">닉네임</span>
                                </label>
                                <input type="text" name="nickname" placeholder="닉네임을 입력하세요." defaultValue={nickname} className={inputClassName} maxLength={12} onChange={(e) => setNickname(e.target.value)} />
                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt">(12글자 이하로 입력하세요)</span>
                                </label>
                            </div>

                            <div className="form-control w-full max-w-full">
                                <label className="label">
                                    <span className="label-text">비밀번호</span>
                                </label>
                                <input type="password" placeholder="현재 비밀번호" className={inputClassName} minLength={6} maxLength={16} />
                                <label className="label">
                                </label>
                            </div>

                            <div className="form-control w-full max-w-full">

                                <input type="password" placeholder="새 비밀번호" className={inputClassName} minLength={6} maxLength={16} />
                                <label className="label">

                                </label>
                            </div>

                            <div className="form-control w-full max-w-full">

                                <input type="password" name="password" placeholder="새 비밀번호 확인" className={inputClassName} minLength={6} maxLength={16} onChange={(e) => setPassword(e.target.value)} />
                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt justify-end">(6글자 이상, 16글자 이하로 입력하세요  )</span>
                                </label>
                            </div>

                            <div className="form-control w-full max-w-full">
                                <label className="label">
                                    <span className="label-text">휴대폰 번호</span>
                                </label>
                                <input type="number" name="phone" placeholder="휴대폰 번호를 입력하세요" defaultValue={phone} className={inputClassName} onInput={(e) => phoneLengthLimit(e)} onChange={(e) => setPhone(e.target.value)} />

                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt">(-없이 숫자만 입력하세요)</span>
                                </label>
                            </div>

                            <div className="form-control w-full max-w-full">
                                <label className="label">
                                    <span className="label-text">이메일</span>
                                </label>
                                <input type="email" name="email" placeholder="이메일을 입력하세요" defaultValue={email} className={inputClassName} maxLength={64} onChange={(e) => setEmail(e.target.value)} />
                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt"></span>
                                </label>
                            </div>
                            <div className='flex justify-end'>
                                <button className={"btn btn-accent " + Styles[`mypage-save-button`]}>변경하기</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyPageInfo;