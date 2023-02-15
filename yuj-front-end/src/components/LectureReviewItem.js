import { useEffect } from "react";
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";

const LectureReviewItem = (props) => {

    const item = props.item;

    const loginUserInfo = useSelector(state => state.user);


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
        return result;
    }

    return(
        <>
            <div id="review-item-container" className="p-8" style={{ 'border-bottom': '2px solid black' }}>
                <Header className="" id="review-item-profile-container">
                    <img className="w-12 rounded-full" src={`${process.env.REACT_APP_IMAGE_URL}/${item.profileImage}`} style={{border : '2px solid black'}}/>
                    <HeaderDetailsWrapper id="review-text-info-container">
                        <HeaderDetail className="w-20 truncate">{item.userName}</HeaderDetail>
                        <HeaderDetail>{item.date}</HeaderDetail>
                        <HeaderDetail className="rating rating-sm flex justify-evenly w-24">
                            {drawRating(item.rating)}
                        </HeaderDetail>
                        {loginUserInfo.userInfo.id === item.userId ? 
                        (<div><EditIcon/><DeleteIcon/></div>) : null}
                    </HeaderDetailsWrapper>
                </Header>
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

const Header = styled.div`
    display: flex;
    align-items:center;
    gap : 30px;
`;

const HeaderDetailsWrapper = styled.div`
    display: flex;  
    &:nth-child(3){
        position: relative;
        bottom:1px;
    }

    *{
        cursor : initial !important;
    }
`;

const HeaderDetail = styled(HeaderDetailsWrapper)`
    align-items: center;
`;