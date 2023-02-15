import { useEffect } from "react";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";

const LectureReviewItem = (props) => {

    const item = props.item;

    const loginUserInfo = useSelector(state => state.user);

    useEffect(()=>{

        console.log('login user id : ',loginUserInfo.userInfo.id);
        console.log('item : ', item);
    })

    /*
        not fixed
        별점이 잘 표시되지 않는 버그 있음 e.g) 4-> 5점으로 표시
    */
    function drawRating(point){
        const result = [];
        for(let i=0; i<point; i++)
            result.push(<input type="radio" name="rating-2" className="mask mask-star-2 bg-accent" disabled checked/>);
        for(let i=0; i<5-point; i++)
            result.push(<input type="radio" name="rating-2" className="mask mask-star-2 bg-accent" disabled />);
        console.log(result);
        return result;
    }

    return(
        <>
            <div id="review-item-container">
                <div className="flex justify gap-3" id="review-item-profile-container">
                    <img className="w-12 rounded-full" src={item.profileImg} style={{border : '2px solid red'}}/>
                    <div id="review-text-info-container" className="flex justify-evenly">
                        <div className="w-20 truncate">{item.userName}</div>
                        <div>{item.date}</div>
                        <div className="rating rating-sm flex justify-evenly w-24">
                            {drawRating(item.rating)}
                        </div>
                        {loginUserInfo.userInfo.id === item.userId ? 
                        (<div><EditIcon/><DeleteIcon/></div>) : null}
                    </div>
                </div>
                <div className="text-success" id="review-item-lecture-title">
                    {item.lectureName}
                </div>
                <div id="review-item-ltecture-review">
                    {item.review}
                </div>
            </div>
        </>
    );

}

export default LectureReviewItem;