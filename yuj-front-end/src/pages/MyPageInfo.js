import React from "react";
import MypageSidebar from './../components/MypageSidebar';
import profilePicture from '../assets/tempProfilePicture.jpg'
import MainFooter from './../components/mainFooter/MainFooter';
import MainHeader from './../components/mainHeader/MainHeader';
function maxLengthCheck(e) {
    const target = e.target;

    //target.value.length = input에서 받은 value의 길이
    target.maxLength = 11;
    if (target.value.length > target.maxLength) {
        target.value = target.value.slice(0, target.maxLength);
    }
}

const MyPageInfo = () => {

    return (
        <>
            <MainHeader />
            <div style={{ display: "flex" }}>
                <MypageSidebar />
                <div className="info-background-image" >

                    <div className="w-full flex flex-col gap-2 ">

                        <form className="p-10 card bg-base-200 info-container " method="POST">

                            <input type="hidden" name="method" value="PUT"></input>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">프로필 이미지</span>
                                </label>
                                <div className="avatar">
                                    <div className="w-24 rounded-full">
                                        <img src={profilePicture} />
                                    </div>
                                    <input type="file" className="file-input file-input-bordered file-input-accent w-full profile-input mypage-input" />
                                </div>
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">닉네임</span>
                                </label>
                                <input type="text" placeholder="현재 닉네임 적어두기" className="input input-bordered w-full mypage-input" maxLength={16} />
                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt"></span>
                                </label>
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">비밀번호</span>
                                </label>
                                <input type="password" placeholder="현재 비밀번호" className="input input-bordered w-full mypage-input" maxLength={64} />
                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt"></span>
                                </label>
                            </div>

                            <div className="form-control w-full max-w-xs">

                                <input type="password" placeholder="새 비밀번호" className="input input-bordered w-full mypage-input" maxLength={64} />
                                <label className="label">

                                </label>
                            </div>

                            <div className="form-control w-full max-w-xs">

                                <input type="password" placeholder="새 비밀번호 확인" className="input input-bordered w-full mypage-input" maxLength={64} />
                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt justify-end">(알파뱃, 숫자, 특수문자 포함 x글자 이상 입력하세요)</span>
                                </label>
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">휴대폰 번호</span>
                                </label>
                                <input type="number" placeholder="기존 휴대폰번호 적어두기" className="input input-bordered w-full mypage-input" onInput={(e) => maxLengthCheck(e)} />

                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt">(-없이 숫자만 입력하세요)</span>
                                </label>
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">이메일</span>
                                </label>
                                <input type="email" placeholder="기존 이메일 적어두기" className="input input-bordered w-full mypage-input" maxLength={320} />
                                <label className="label">
                                    <span className="label-text-alt"></span>
                                    <span className="label-text-alt"></span>
                                </label>
                            </div>
                            <div class='flex justify-end'>
                                <button className="btn btn-accent mypage-save-button">저장하기</button>
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