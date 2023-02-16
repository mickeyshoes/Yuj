import axios from "axios";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CreateIcon from '@mui/icons-material/Create';
import StudioSidebar from "../components/StudioSidebar";
import PageHeadPTag from "../components/pageItems/PageHeadPTag";
import LectureReviewItem from "../components/LectureReviewItem";
import { useNavigate } from "react-router";

const StudioReview = (props) => {

    const user = useSelector(state => state.user);
    const studio = useSelector(state => state.studio);
    const navigate = useNavigate();

    const [reviewList, setReviewList] = useState([]);

    //for debug
    const alt_img = 'https://pbs.twimg.com/profile_images/1536535827257630720/VUZLhP8M_400x400.jpg'


    //init - get all review for lecture(teacher's only)
    useEffect(()=>{
        getReviews();
        // console.log('회원 계정', user);
        // console.log(typeof(user.userId));
        // console.log('스튜디오 강의 아이디', studio);
        // console.log('강의 목록 리스트 : ', studio.studioLectureList);
        // console.log(process.env.REACT_APP_API_URL);
    }, []);

    // change axios, add async
    const getReviews = async () => {
        // const url = process.env.REACT_APP_API_URL + '/';
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/lectures/review?userId=${studio.studioDetail.userId}`
            // `http://localhost:5000/lectures/review?userId=${studio.studioDetail.userId}`
        );
        setReviewList(response.data);
    }

    async function addReview() {
        navigate('/studio/addReview'); 
    }
    
    return(
        <>
        <div className="flex w-full">
            <StudioSidebar studioDetail={studio.studioDetail} userId={studio.userId} studioLiveLecture={studio.studioLiveLecture}/>
            <div className="flex-auto px-40 pt-20">
                <PageHeadPTag content="강의 후기"/>
                    <div className="flex justify-between">
                        <div><span className="text-success">총 {reviewList.length}개의 후기</span></div> 
                        {
                            studio.studioDetail.studioId == user.userId || user.userId === ""
                                ?<button className="border-none btn-accent btn-access text-white gap-2 " style={{'background-color': '#cccccc'}}><CreateIcon />후기 작성</button>
                                :<button className="border-none btn-accent btn-access text-white gap-2 " onClick={addReview}><CreateIcon />후기 작성</button>
                        }
                    </div>
                    <div className="items-center">
                        {reviewList?.map((item, idx) =>
                            <LectureReviewItem className="pt-20" item={item} key={idx} />
                        )}
                    </div>
            </div>
        </div>
        </>
    );
}

export default StudioReview;