import axios from "axios";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StudioSidebar from "../components/StudioSidebar";
import LectureReviewItem from "../components/LectureReviewItem";
import { useNavigate } from "react-router";
import Styles from '../pages/StudioLectureCreatePage.module.css';

const StudioReview = (props) => {

    const user = useSelector(state => state.user);
    const studio = useSelector(state => state.studio);
    const navigate = useNavigate();

    const [lectureList, setLectureList] = useState([]);

    //init - get all review for lecture(teacher's only)
    useEffect(()=>{
        getLectures();
        console.log(lectureList);
        console.log('스튜디오 주인', studio.studioDetail.studioId);
    }, []);

    // change axios, add async
    const getLectures = async () => {
        // const url = process.env.REACT_APP_API_URL + '/';
        const response = await axios.get(
            `http://localhost:5000/studio/${studio.studioDetail.studioId}/lectures`
        );
        setLectureList(response.data);
    }

    async function addReview() {
        //0. check isLogin
        console.log('addReview');
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
    }
    const [Selected, setSelected] = useState("");
    const handleSelect = (e) => { 
        setSelected(e.target.value);
    }

    function drawRating(point){
        const result = [];
        for(let i=0; i<point; i++)
            result.push(<input type="radio" name="rating-2" className="mask mask-star-2 bg-accent"/>);
        for(let i=0; i<5-point; i++)
            result.push(<input type="radio" name="rating-2" className="mask mask-star-2 bg-accent" />);
        console.log(result);
        return result;
    }

    return(
        <>
        <div className="flex w-full">
            <StudioSidebar studioDetail={studio.studioDetail} userId={studio.userId} studioLiveLecture={studio.studioLiveLecture}/>
            <div className="flex-auto px-40 pt-20">
                <form className="w-full mt-16">
                    {
                        lectureList.length > 0
                            ? <>
                                <select onChange={handleSelect} value={Selected}>
                                    {lectureList.map((item, idx) => (
                                        <option value={item.lectureId} key={ idx}>
                                            { item.name}
                                        </option>
                                    ))}
                                </select>
                            </>
                        : null
                    }
                    <div className="rating rating-sm flex justify-evenly w-24 pt-8">
                        {drawRating(0)}
                    </div>
                    {/* 강의 타이틀, 소개글 */}
                    <div className="w-full">
                        <textarea className={Styles.focusNone + " textarea textarea-bordered w-full my-7"} rows={7} placeholder="후기를 입력해 주세요."></textarea>
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
    );
}

export default StudioReview;