import React, { useEffect,useState } from "react";
import { useSelector, useDispatch} from 'react-redux';
import LectureItemCard from "./LectureItemCard";
import { searchTeachers } from '../stores/studioSlice';
import SearchIcon from '@mui/icons-material/Search';
import SearchTeacherListItem from '../components/SearchTeacherListItem'

const MainSearchTeacher = () => {
    const [keyword, setKeyword] = useState('');
    let teachers = useSelector(state => state.studio.teachersSearched)
    const dispatch = useDispatch();

    const doSearch = () => {
        dispatch(searchTeachers(keyword));
    }
    
    const handleOnKeyPress = (e) => {
        console.log(e);
        if (e.key === 'Enter') {
            doSearch();
        }
    }
    
    return (
        <>
            <div className="flex w-full">
                <div className="flex-auto px-40 pt-20">
                    <div className="flex justify-between items-center">
                        <p className="text-3xl font-bold text-accent mb-6 mr-3">강사 목록</p>
                        <div className="form-control" style={{ position: 'relative', paddingRight: '0px' }}>
                            <input onKeyPress={handleOnKeyPress} value={keyword} onChange={(e) => setKeyword(e.target.value)} type="text" placeholder="검색어를 입력해주세요" className={"input w-60 text-black text-xs rounded-xl input-sm bg-secondary"} />
                            <button onClick={() => doSearch()} className={'btn btn-xs btn-secondary border-none btn-circle'}  style={{ position: 'absolute', top:'4px', right:'10px', height:'1rem'}}>
                                <SearchIcon style={{height:'1rem'}}/>
                            </button>
                        </div>
                    </div>
                    <div className="flex py-12 px-0">
                        <div className="flex flex-wrap justify-start gap-9">
                            {teachers?.map((teacher) => (
                                <SearchTeacherListItem key={teacher.userId} teacherInfo={teacher} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainSearchTeacher;
