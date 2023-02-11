import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginRequest, getUserInfo } from '../stores/userSlice';
import Styles from './LoginPage.module.css';

const LoginPage = () => {

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest({id, password}));
  }

  useEffect(() => {
    if(user.userId != '') {
      dispatch(getUserInfo({accessToken: user.tokenInfo.accessToken, userId: user.userId}))
      navigate('/');
    }
  }, [user.userId])

  return (
    <div className={'px-60 w-full'}>
      <div className={Styles[`info-background-image`] + ' w-full flex items-center justify-center'}>
        <form className={"py-8 px-8 rounded-xl card bg-base-200 max-w-sm " + Styles[`info-container`]} onSubmit={handleSubmit}>
          <p className={'text-2xl mb-3 text-black font-bold'}>로그인</p>
          <div className="form-control w-full">
              <label className="label">
                  <span className="label-text text-xs text-black font-bold">아이디 : </span>
              </label>
              <input type="text" name="id" placeholder="" className={" input rounded-xl input-sm"} maxLength={16} onChange={(e) => setId(e.target.value)} />
              <label className="label">
                  <span className="label-text-alt"></span>
                  <span className="label-text-alt"></span>
              </label>
          </div>

          <div className="form-control w-full">
              <label className="label">
                  <span className="label-text text-xs text-black font-bold">비밀번호 : </span>
              </label>
              <input type="password" placeholder="" className={" input rounded-xl input-sm"} minLength={6} maxLength={16} onChange={(e) => setPassword(e.target.value)} />
              <label className="label">
                  <span className="label-text-alt"></span>
                  <span className="label-text-alt"></span>
              </label>
          </div>

          <div className='flex flex-col justify-end items-end mt-5'>
              <button className={"btn btn-xs btn-accent " + Styles[`mypage-save-button`]}>로그인</button>
              <p className={'text-xs mt-3'}>YUJ 계정이 없으신가요? <Link to={'/studio'} className={'text-black font-bold'} > 회원등록</Link></p>
          </div>
          <hr className={'my-5'}/>
        </form>
      </div>
    </div>
  )
}

export default LoginPage