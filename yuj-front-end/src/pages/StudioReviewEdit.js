import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const StudioReviewEdit = (props) =>{

    const user = useSelector(state => state.user);
    const studio = useSelector(state => state.studio);
    const history = useHistory();

    let isAvailable = false;
    let enrolledLectureList = []
    //initial 
    useEffect(()=>{
        const response = isEnrolled();
        if(response) { isAvailable = true }
        response.map( 
            (item) => enrolledLectureList.push(item.name))

    }, []);

    async function isEnrolled(){
        const loginUser = user.userInfo.id;
        const lectureID = studio.studioDetail.userId;
        const url = `${process.env.REACT_APP_API_URL}/users/${loginUser}/lectures?user=${lectureID}`; 
        const response = await axios.get(url);
        return response.data;
    }

    return(
        <>
            { isAvailable === true ?
                (<div></div>) : 
                (<CommonModal 
                    title= "수강 내역이 존재하지 않습니다" 
                    content= "Yes 를 누르시면 이전 페이지로 이동합니다." 
                    buttons= {
                        [
                            {
                                text : "Yes",
                                className: "btn-accent p-10",
                                style: { margin:10, padding:5 },
                                onClickEvent:() => history.goBack(),
                            }
                        ]
                    }
                    />
                )
            }
        </>
    );


};

export default StudioReviewEdit;