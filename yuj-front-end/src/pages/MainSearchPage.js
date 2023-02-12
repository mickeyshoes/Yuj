import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { searchLectures } from '../stores/lectureSlice';
import { searchTeachers } from '../stores/studioSlice';
import { useNavigate, useLocation } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import SearchTeacherListItem from '../components/SearchTeacherListItem'
import ListTitle from '../components/ListTitle'
import LectureItemCard from '../components/LectureItemCard';

const MainSearchPage = (props) => {

  const [keyword, setKeyword] = useState('');

  const lecture = useSelector(state => state.lecture);
  const studio = useSelector(state => state.studio);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const doSearch = () => {
    dispatch(searchLectures(keyword));
    dispatch(searchTeachers(keyword));
  }

  const handleOnKeyPress = (e) => {
    console.log(e);
    if (e.key === 'Enter') {
      doSearch();
    }
  }

  useEffect(() => {
    if(location.state != null){
      setKeyword(location.state.keyword);
    }
  }, [location.state.keyword])

  useEffect(() => {
    doSearch();
  }, [keyword])

  

  return (
    <div className='w-full px-48 mt-16'>
      <div className={'flex justify-between items-center mb-16'}>
        <p className={'text-3xl text-accent font-bold'}>검색 결과</p>
        <div className="form-control" style={{ position: 'relative', paddingRight: '0px' }}>
          <input onKeyPress={handleOnKeyPress} value={keyword} onChange={(e) => setKeyword(e.target.value)} type="text" placeholder="검색어를 입력해주세요" className={"input w-60 text-black text-xs rounded-xl input-sm bg-secondary"} />
          <button onClick={() => doSearch()} className={'btn btn-xs btn-secondary border-none btn-circle'}  style={{ position: 'absolute', top:'4px', right:'10px', height:'1rem'}}>
            <SearchIcon style={{height:'1rem'}}/>
          </button>
        </div>
      </div>


      <div className={'mb-20'}>
        <div className={'flex mb-3'}>
          <ListTitle className={'text-xl'} titleText={'강사 목록'} onClickEvent={() => navigate('/')}/>
        </div>
        <div>
          { studio.teachersSearched.map((teacher, idx) => 
              idx < 3 ? <SearchTeacherListItem key={teacher.userId} teacherInfo={teacher}/> : null
          )}
        </div>
      </div>


      <div className={'mb-20'}>
        <div className={'flex mb-5'}>
          <ListTitle className={'text-xl'} titleText={'강의 목록'} onClickEvent={() => navigate('/')}/>
        </div>
        <div className={'flex justify-evenly'}>
          { lecture.lecturesSearched.map((lecture, idx) => 
              idx < 3 ? <LectureItemCard key={lecture.lectureId} thisLecture={lecture}/> : null
          )}
        </div>
      </div>
    </div>
  )
}

export default MainSearchPage


