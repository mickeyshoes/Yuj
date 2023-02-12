import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { clearUserState } from '../../stores/userSlice';
import styles from './MainHeader.module.css'
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const LoginBox = () => {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <ul className="menu menu-horizontal px-1">
      {
        user.userId?
        
        /**
         * 로그인 한 상태일 때
         */
        <>
          <li>
            <Link to="/mypage/dashboard" className={styles.menu}>
              <img src={'https://i8a504.p.ssafy.io/'+user.userInfo.profileImage}/>
            </Link>
          </li>
          <li><Link to="/mypage/dashboard" className={styles.menu + ""}>{user.userInfo.nickname}님 환영합니다.</Link></li>
          <li><a onClick={() => dispatch(clearUserState())} className={styles.menu + ""}>로그아웃</a></li>
        </>

        :

        /**
         * 로그인 하지 않은 상태일 때
         */
        <>
          <li>
            <Link to="/" className={styles.menu}>
              <AccountBoxIcon />
            </Link>
          </li>
          <li><Link to="/login" className={styles.menu + ""}>로그인</Link></li>
          <li><Link to="/signup" className={styles.menu + " mr-7"}>회원가입</Link></li>
        </>

      }
    </ul>
  )
}

export default LoginBox