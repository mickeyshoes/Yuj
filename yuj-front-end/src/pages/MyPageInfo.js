import React from "react";
import MyPageSidebar from '../components/MyPageSidebar';
import MainFooter from './../components/mainFooter/MainFooter';
import MainHeader from './../components/mainHeader/MainHeader';
import Styles from './MyPages.module.css';
import { useState } from "react";


//핸드폰 번호를 11자로 제한하기 위한 함수
function phoneLengthLimit(e) {
    const target = e.target;

    //target.value.length = input에서 받은 value의 길이
    target.maxLength = 11;
    if (target.value.length > target.maxLength) {
        target.value = target.value.slice(0, target.maxLength);
    }
}

// 내 정보의 input상자 클래스를 한번에 관리하기 위한 inputClassName
const inputClassName = "rounded-[5px] pl-2 h-6 input-bordered w-full text-base " + Styles[`mypage-input`];

const MyPageInfo = () => {

    return (
        <>
            <MainHeader />
            <div className="flex">
                <MyPageSidebar />
                <div className="px-40 w-full">
                    <div className={"flex " + Styles[`info-background-image`]} >

                        <form className="p-10 card bg-base-200 info-container " method="POST">

                            <input type="hidden" name="method" value="PUT"></input>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">프로필 이미지</span>
                                </label>
                                <div className="avatar">
                                    <div className="w-24 rounded-full">
                                        <img src='/assets/tempProfilePicture.jpg' />
                                    </div>
                                    {/* 이전 인풋박스 */}
                                    {/* <input type="file" className="file-input file-input-bordered file-input-accent w-full profile-input mypage-input" /> */}
                                    <input type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 profile-input mypage-input"/>
                                </div>
                            </div>

                            <div className="form-control w-full max-w-full">
                                <label className="label">
                                    <span className="label-text">닉네임</span>
                                </label>
                                <input type="text" placeholder="현재 닉네임 적어두기" className={inputClassName} maxLength={16} />
                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt"></span>
                                </label>
                            </div>

                            <div className="form-control w-full max-w-full">
                                <label className="label">
                                    <span className="label-text">비밀번호</span>
                                </label>
                                <input type="password" placeholder="현재 비밀번호" className={inputClassName} maxLength={64} />
                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt"></span>
                                </label>
                            </div>

                            <div className="form-control w-full max-w-full">

                                <input type="password" placeholder="새 비밀번호" className={inputClassName} maxLength={64} />
                                <label className="label">

                                </label>
                            </div>

                            <div className="form-control w-full max-w-full">

                                <input type="password" placeholder="새 비밀번호 확인" className={inputClassName} maxLength={64} />
                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt justify-end">(알파뱃, 숫자, 특수문자 포함 x글자 이상 입력하세요)</span>
                                </label>
                            </div>

                            <div className="form-control w-full max-w-full">
                                <label className="label">
                                    <span className="label-text">휴대폰 번호</span>
                                </label>
                                <input type="number" placeholder="기존 휴대폰번호 적어두기" className={inputClassName} onInput={(e) => phoneLengthLimit(e)} />

                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt">(-없이 숫자만 입력하세요)</span>
                                </label>
                            </div>

                            <div className="form-control w-full max-w-full">
                                <label className="label">
                                    <span className="label-text">이메일</span>
                                </label>
                                <input type="email" placeholder="기존 이메일 적어두기" className={inputClassName} maxLength={320} />
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
            <MainFooter />

        </>
    );
}

export default MyPageInfo;