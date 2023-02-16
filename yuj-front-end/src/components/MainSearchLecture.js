import React, { useEffect,useState } from "react";
import { useSelector, useDispatch} from 'react-redux';
import LectureItemCard from "./LectureItemCard";
import { searchLectures } from '../stores/lectureSlice';
import SearchIcon from '@mui/icons-material/Search';
import MainSearchLectureListCategorySelectBox from "./MainSearchLectureListCategorySelectBox";

const MainSearchTeacher = () => {
    const [keyword, setKeyword] = useState('');
    let lectures = useSelector(state => state.lecture.lecturesSearched)
    const dispatch = useDispatch();

    const doSearch = () => {
        dispatch(searchLectures(keyword));
    }
    
    const handleOnKeyPress = (e) => {
        console.log(e);
        if (e.key === 'Enter') {
            doSearch();
        }
    } 
    
    useEffect(() => {
        if(lectures.length == 0){
            doSearch();
        }
    },[])

    return (
        <>
            <div className="flex w-full">
                <div className="flex-auto px-40 pt-20">
                    <div className="flex justify-between items-center">
                        <p className="text-3xl font-bold text-accent mr-3">강의 목록</p>
                        <div className="flex">
                            <div className="flex items-center">
                                <MainSearchLectureListCategorySelectBox keyword={ keyword} />
                            </div>
                            <div className="form-control" style={{ position: 'relative', paddingRight: '0px' }}>
                                <input onKeyPress={handleOnKeyPress} value={keyword} onChange={(e) => setKeyword(e.target.value)} type="text" placeholder="검색어를 입력해주세요" className={"input w-60 text-black text-xs rounded-xl input-sm bg-secondary"} />
                                <button onClick={() => doSearch()} className={'btn btn-xs btn-secondary border-none btn-circle'}  style={{ position: 'absolute', top:'4px', right:'10px', height:'1rem'}}>
                                    <SearchIcon style={{height:'1rem'}}/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex py-12 px-0">
                        <div className="flex flex-wrap justify-start gap-9">
                            {lectures?.map((lecture) => (
                                console.log("lecture는"),
                                console.log(lecture),
                                <LectureItemCard key={lecture.lectureId} thisLecture={lecture}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainSearchTeacher;
