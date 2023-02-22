import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { searchLectures } from '../../stores/lectureSlice';
import { searchTeachers } from '../../stores/studioSlice';
import { useLocation } from 'react-router-dom';
import styles from './MainHeader.module.css'
import SearchIcon from '@mui/icons-material/Search';
import LoginBox from './LoginBox';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const MainHeader = () => {

  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const doSearch = () => {
    navigate('/search', { state: { keyword: keyword } });
    dispatch(searchLectures(keyword));
    dispatch(searchTeachers(keyword));
  }

  const notReadyAlert = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "info",
      iconColor: "#EBE8DF",
      text: "아직 준비 중인 페이지입니다.",
      confirmButtonColor: "#90859A",
      confirmButtonText: "확인",
    })
  }

  const handleOnKeyPress = (e) => {
    console.log(e);
    if (e.key === 'Enter') {
      doSearch();
    }
  }

  useEffect(() => {
    setKeyword('');
  }, [location])


  return (
    <div className="navbar bg-secondary" style={{ height: '100px', minHeight: '100px' }}>
      <div className="flex-1">
        <Link to="/" className="normal-case text-xl ml-6">
          <img className='yuj-logo' alt='No Image' src='/assets/YujMainLogo.svg' style={{ height: '75px', marginLeft: '40px' }}></img>
        </Link>
      </div>
      <div className="flex-none" >
        <div className="form-control" style={{ position: 'relative', paddingRight: '15px' }}>
          <input onKeyPress={handleOnKeyPress} value={keyword} onChange={(e) => setKeyword(e.target.value)} type="text" placeholder="#강의#강사" className={styles.search + " input input-bordered"} />
          <button onClick={() => doSearch()} className={'btn btn-xs btn-ghost border-none btn-circle'} style={{ position: 'absolute', top: '2px', right: '20px', height: '1rem' }}>
            <SearchIcon style={{ height: '1rem' }} />
          </button>
        </div>
        <ul className="menu menu-horizontal px-1 items-center">
          <li className='px-2'><Link to="/searchLecture" className={styles.menu}>강의 소개</Link></li>
          <li className='px-2'><Link to="/searchTeacher" className={styles.menu}>강사 소개</Link></li>
          <li className='pl-2'><Link to="/" onClick={notReadyAlert} className={styles.menu}>문의사항</Link></li>
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

