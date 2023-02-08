import React from 'react'
import { Link } from 'react-router-dom'
import styles from './MainHeader.module.css'
import SearchIcon from '@mui/icons-material/Search';
import LoginBox from './LoginBox';

const MainHeader = () => {
  return (
    <div className="navbar bg-secondary" style={{ height: '100px', minHeight: '100px' }}>
      <div className="flex-1">
        <Link to="/" className="normal-case text-xl ml-6">
          <img className='yuj-logo' alt='No Image' src='/assets/YujMainLogo.svg' style={{ height: '75px', marginLeft: '40px' }}></img>
        </Link>
      </div>
      <div className="flex-none" >
        <div className="form-control" style={{ position: 'relative', paddingRight: '15px' }}>
          <SearchIcon style={{ position: 'absolute', top:'8px', right:'20px', height:'0.75rem'}}/>
          <input type="text" placeholder="#강의#강사" className={styles.search + " input input-bordered"} />
        </div>
        <ul className="menu menu-horizontal px-1 items-center">
          <li className='px-2'><Link to="/" className={styles.menu}>메인 페이지</Link></li>
          <li className='px-2'><Link to="/testLectureCard" className={styles.menu}>강의 소개</Link></li>
          <li className='px-2'><Link to="/testLectureDetail" className={styles.menu}>강사 소개</Link></li>
          <li className='pl-2'><Link to="/" className={styles.menu}>문의사항</Link></li>
        </ul>
        <div className='mx-5'> | </div>
        <div>
         <LoginBox />
        </div>
      </div>
    </div>
  )
}

export default MainHeader;

