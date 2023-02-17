import axios from "axios";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StudioSidebar from "../components/StudioSidebar";
import LectureReviewItem from "../components/LectureReviewItem";
import { useNavigate } from "react-router";
import Styles from '../pages/StudioLectureCreatePage.module.css';
import styled from 'styled-components';
import PageHeadPTag from "../components/pageItems/PageHeadPTag";

const StudioReview = (props) => {

    const user = useSelector(state => state.user);
    const studio = useSelector(state => state.studio);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [lectureList, setLectureList] = useState([]);

    //init - get all review for lecture(teacher's only)
    useEffect(()=>{
        getLectures();
        console.log(lectureList);
        console.log('현재 유저', user);
        console.log('스튜디오 주인', studio.studioDetail.userId);
    }, []);

    // change axios, add async
    const getLectures = async () => {
        // const url = process.env.REACT_APP_API_URL + '/';
        const response = await axios.get(
            // `http://localhost:5000/studio/${studio.studioDetail.studioId}/lectures`
            `${process.env.REACT_APP_API_URL}/studio/${studio.studioDetail.userId}/lectures`
        );
        setLectureList(response.data);
        setLoading(false);
    }

    const [selectedValue, setSelectedValue] = useState("");
    
    const handleSelectChange = (event) => { 
        setSelectedValue(event.target.value);
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        console.log(selectedValue);
        console.log(data.rating);
        console.log(data.review);

        //0. check isLogin
        //1. check login user is enrolled
        // const userEnrolledList = await isEnrolled();
        // console.log(userEnrolledList);

        // //3. else throws modal not available
        // if(userEnrolledList){
        //     //routing
        //     navigate("/studio/review")
        // }
        // else{
        //     //goto modal
        // }
        let body = {
            review : data.review,
            score : data.rating,
            lectureId : selectedValue,
            userId: user.userId,
            teacherId: studio.studioDetail.studioId
        }

        const response = await axios.post(
            `https://i8a504.p.ssafy.io/api/lectures/review`, body,
            // `${process.env.REACT_APP_API_URL}/lectures/review`, body,
        );
        navigate(-1);
    }
    
    
    function drawRating() {
        const result = [];
        for (let i = 0; i < 5; i++) {
            result.push(<input type="radio" name="rating" className="mask mask-star-2 bg-accent" value={i + 1} />);
        }
        return result;
    }

    return !loading ? (
        <>
            <div className="flex w-full">
            <StudioSidebar studioDetail={studio.studioDetail} userId={studio.userId} studioLiveLecture={studio.studioLiveLecture}/>
            <div className="flex-auto px-40 pt-20">
                <PageHeadPTag content="후기 등록"/>
                <form className="w-full mt-16" onSubmit={handleSubmit}>
                    {
                        lectureList.length > 0
                            ? <SelectWrapper>
                                <select style={{border: '1px solid rgba(0,0,0,0.175)', padding : '1rem 0.5rem', 'line-height': '2', 'border-radius': '10px', outline: 'none'}} value={selectedValue} onChange={handleSelectChange}>
                                    <option value="default" className="big-info">
                                        강의 선택
                                    </option>
                                    {lectureList.map((item, idx) => (
                                        <option value={item.lectureId} key={ idx}>
                                            {item.name} 
                                        </option>
                                    ))}
                                    </select>
                            </SelectWrapper>
                        : null
                    }
                    <div className="rating rating-sm flex justify-evenly w-24 pt-8">
                        {drawRating()}
                    </div>
                    {/* 강의 타이틀, 소개글 */}
                    <div className="w-full">
                            <textarea name='review' className={Styles.focusNone + " textarea textarea-bordered w-full my-7"} rows={7} placeholder="후기를 입력해 주세요."></textarea>
                        <hr />
                    </div>
                    <div className="flex justify-end gap-2 pt-8">
                        {/* 타입을 명확히 지정해 주지 않으면 submit과 혼동이 있을 수 있음 */}
                        <button type='submit' className="btn btn-accent text-white px-12">작성하기</button>
                        <button type='button' className="btn btn-primary px-12" onClick={() => navigate("/studioLectureListPage")}>뒤로가기</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    ) : null;
}

export default StudioReview;

const SelectWrapper = styled.div`
    position: relative;
    overflow-x: hidden;
    select{
        width : 674px;
        word-break: break-all;
        text-overflow: ellipsis;
    }
`;


