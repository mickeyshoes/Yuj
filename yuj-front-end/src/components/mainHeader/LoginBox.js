import React from 'react'
import { Link } from 'react-router-dom'
import styles from './MainHeader.module.css'
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const LoginBox = () => {
  return (
    <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/" className={styles.menu}>
              <AccountBoxIcon />
            </Link>
          </li>
          <li><Link to="/login" className={styles.menu}>로그인</Link></li>
          <li><Link to="/signin" className={styles.menu} style={{ marginRight: '30px' }}>회원가입</Link></li>
    </ul>
  )
}

export default LoginBox