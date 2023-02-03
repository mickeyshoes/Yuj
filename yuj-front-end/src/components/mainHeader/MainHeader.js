import React from 'react'
import { Link } from 'react-router-dom'
import styles from './MainHeader.module.css'
import SearchIcon from '@mui/icons-material/Search';
import LoginBox from './LoginBox';
import './MainHeader.css'

const MainHeader = () => {
  return (
    <div className="navbar bg-secondary" style={{ height: '100px', minHeight: '100px' }}>
      <div className="flex-1">
        <Link to="/" className="normal-case text-xl">
          <img className='yuj-logo' alt='No Image' src='/assets/YujMainLogo.svg' style={{ height: '75px', marginLeft: '40px' }}></img>
        </Link>
      </div>
      <div className="flex-none" >
        <div className="form-control" style={{ position: 'relative', paddingRight: '15px' }}>
          <SearchIcon style={{ position: 'absolute', top:'6px', right:'20px', height:'0.75rem'}}/>
          <input type="text" placeholder="#강의#강사" className="input input-bordered" />
        </div>
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/" className={styles.menu}>메인 페이지</Link></li>
          <li><Link to="/testLectureCard" className={styles.menu}>강의 소개</Link></li>
          <li><Link to="/testLectureDetail" className={styles.menu}>강사 소개</Link></li>
          <li><Link to="/" className={styles.menu}>문의사항</Link></li>
        </ul>
        <LoginBox />
      </div>
    </div>
  )
}

export default MainHeader;

