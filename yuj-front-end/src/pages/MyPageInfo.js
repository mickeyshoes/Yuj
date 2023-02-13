import React from "react";
import MyPageSidebar from './../components/MyPageSidebar';
import MainFooter from './../components/mainFooter/MainFooter';
import MainHeader from './../components/mainHeader/MainHeader';
import Styles from './MyPages.module.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import { CommonModal, CommonModalBtn } from '../components/CommonModal';

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

    // 내 정보의 input상자 클래스를 한번에 관리하기 위한 inputClassName
    const inputClassName = "rounded-[5px] pl-2 h-6 input-bordered w-full text-base " + Styles[`myPageInput`];

    useEffect(() => {
        const getUserInfo = async () => {
            let userId = 1;//지울예정
            try {
                // 로그인한 유저 정보 가져오기
                const response = await axios.get(`http://localhost:5000/mypage/info/${userId}`);
                const userData = response.data;

                // 유저 기본 정보 넣어주기
                setProfileImage(userData.profileImage);
                setNickname(userData.nickname);
                setPassword(userData.password);
                setPhone(userData.phone);
                setEmail(userData.email);
            } catch (error) {
                console.error(error);
            }
        };
        getUserInfo();
    }, []);

    const [profileImage, setProfileImage] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const updateUser = {
            userId,
            profileImage,
            nickname,
            password,
            phone,
            email,
        };

        axios
            .patch(`/mypage/info/${userId}`, updateUser)
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
    };


    return (
        <>
            <div className="flex w-full ">
                <MyPageSidebar/>
                <div className="px-40 w-full">
                    <div className={"flex " + Styles[`info-background-image`]} >

                        <form className={"p-10 card bg-base-200 " + Styles[`info-container`]} onSubmit={handleSubmit}>

                            {/* <input type="hidden" name="method" value="PUT"></input> */}
                            <input type="hidden" name="userId" value={userId} />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">프로필 이미지</span>
                                </label>
                                <div className="avatar">
                                    <div className="w-24 rounded-full">
                                        {/* 이 아래 현재 로그인한 유저의 이미지파일을 받아와야함 */}
                                        <img src='/assets/tempProfilePicture.jpg' />
                                    </div>
                                    {/* 이전 사용하던 인풋박스 */}
                                    {/* <input type="file" className="file-input file-input-bordered file-input-accent w-full profileInput myPageInput" /> */}
                                    <input type="file" name="profileImage" accept="image/*" className={"block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 " + Styles.profileInput + " " + Styles.myPageInput} onChange={(e) => setProfileImage(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-control w-full max-w-full">
                                <label className="label">
                                    <span className="label-text">닉네임</span>
                                </label>
                                <input type="text" name="nickname" placeholder="닉네임을 입력하세요." defaultValue={"현재 닉네임"} className={inputClassName} maxLength={16} onChange={(e) => setNickname(e.target.value)} />
                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt"></span>
                                </label>
                            </div>

                            <div className="form-control w-full max-w-full">
                                <label className="label">
                                    <span className="label-text">비밀번호</span>
                                </label>
                                <input type="password" placeholder="현재 비밀번호" className={inputClassName} minLength={6} maxLength={16} />
                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt"></span>
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
                                    <span className="label-text-alt justify-end">(비밀번호는 6글자 이상, 16글자 이하로 입력해주세요.)</span>
                                </label>
                            </div>

                            <div className="form-control w-full max-w-full">
                                <label className="label">
                                    <span className="label-text">휴대폰 번호</span>
                                </label>
                                <input type="number" name="phone" placeholder="휴대폰 번호를 입력하세요" defaultValue={"01011223456"} className={inputClassName} onInput={(e) => phoneLengthLimit(e)} onChange={(e) => setPhone(e.target.value)} />

                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt">(-없이 숫자만 입력하세요)</span>
                                </label>
                            </div>

                            <div className="form-control w-full max-w-full">
                                <label className="label">
                                    <span className="label-text">이메일</span>
                                </label>
                                <input type="email" name="email" placeholder="이메일을 입력하세요" defaultValue={"yuj@google.com"} className={inputClassName} maxLength={64} onChange={(e) => setEmail(e.target.value)} />
                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt"></span>
                                </label>
                            </div>
                            <div class='flex justify-end'>
                                <button className={"btn btn-accent " + Styles[`mypage-save-button`]}>저장하기</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyPageInfo;