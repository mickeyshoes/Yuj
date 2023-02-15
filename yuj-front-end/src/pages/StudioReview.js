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
        console.log('회원 계정', user.userId);
        console.log('스튜디오 주인', studio.studioDetail);
    }, []);

    // change axios, add async
    const getReviews = async () => {
        // const url = process.env.REACT_APP_API_URL + '/';
        let userId = 3;
        let lectureId = 0;
        // const response = [
        //     {   
        //         review_id : 1,     
        //         user_id : "chunsik",
        //         date : "2023.02.12",
        //         rating: 4,
        //         title : '속 근육 강화를 위한 30분 속성 요가',
        //         body : "나 김춘식.. 우리 동년배 애들 다 요가한다..",
        //         profileImg : alt_img
        //     },
        //     {
        //         review_id : 2,
        //         user_id : "",
        //         date : "2023.02.14",
        //         rating: 3,
        //         title : '속 근육 강화를 위한 30분 속성 요가',
        //         body : "직장인들을 위한 요가 강의라니.. 정말 많은 도움이 되었습니다. \n강사님이 하나하나 차근차근 동작을 설명 해 주셔서 무리없이 배울 수 있었습니다 ㅎㅎ",
        //         profileImg : alt_img
        //     }
        // ];
        const response = await axios.get(
            `http://localhost:5000/lectures/${userId}/review?lectureId=${lectureId}`
        );
        setReviewList(response.data);
    }

    async function addReview() {
        console.log('addReview');
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
                            studio.studioDetail.studioId == user.userId 
                                ?<button className="border-none btn-accent btn-access text-white gap-2 " style={{'background-color': '#cccccc'}}><CreateIcon />후기 작성</button>
                                :<button className="border-none btn-accent btn-access text-white gap-2 " onClick={addReview}><CreateIcon />후기 작성</button>
                        }
                    </div>
                    <div className="items-center">
                        {reviewList?.map((item, idx) =>
                            <LectureReviewItem item={item} key={item.reviewId} />
                        )}
                    </div>
            </div>
        </div>
        </>
    );
}

export default StudioReview;