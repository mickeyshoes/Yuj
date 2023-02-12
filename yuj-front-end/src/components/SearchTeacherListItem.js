import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchTeacherListItem = (props) => {

    const { studioId, description, username, userId, nickname, email, profileImage } = props.teacherInfo;
    const rating = Math.round(props.teacherInfo.rating);

    const navigate = useNavigate();

    const itemClicked = (teacherId) => {
        navigate("/studio", {state:{teacherId}});
    }

    return (
        <>
            <button onClick={() => itemClicked(userId)} className={'btn-secondary flex w-full items-center py-5 px-12 mt-5 rounded-xl'}>
                <div>
                    <img className={'w-20 h-20 rounded-full object-cover max-w-none'} src='https://s3-alpha-sig.figma.com/img/fe31/dd15/e50ed1ea8df3d76ee0fec38dd23b2efe?Expires=1676246400&Signature=NvelojA-kFn0FICuDGVPAcI-Ji8bQIJc4NqYdETTENesYlRiQ6VjPmKxztJovTduxJmbZhkROp~TXMk~0g8q6wRrBU~x2X~cX1FAsuL-IepZ~-MVe6-EEuw-dAq-M57i~kytmhzidEBi9savqmfGENdkqSFdy~8MRdM4tp8BrEPDXuTFnMlnq2alZJMPPL9DZPubdJEVXrUP8h6EvvE3rXbEQ5CP2BZJkjDPXJnNp5Kc-1rt6JNbnehLeymFkZVcaoE4BOFDMP0lsZOeHHxPF4uatxgmpAJAF4JLh09PlLIwW8h5ACf7FHPv88ViJJWxK9AJC8kUDfgeFEMZDVaYdQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'/>
                    {/* <img className={'w-20 h-20 rounded-full object-cover max-w-none'} src={'https://i8a504.p.ssafy.io/'+profileImagePath}/> */}
                </div>
                <div className={'ml-5 mr-16 w-40'}>
                    <p className={'text-sm text-left font-bold'}>{nickname}</p>
                    <p className={'text-xs text-left my-1 w-32'}>{email}</p>
                    <div className="rating rating-md flex justify-evenly w-24">
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-accent" readOnly checked={rating == 1}/>
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-accent" readOnly checked={rating == 2}/>
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-accent" readOnly checked={rating == 3}/>
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-accent" readOnly checked={rating == 4}/>
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-accent" readOnly checked={rating == 5}/>
                    </div>
                </div>
                <div>
                    <p className={'text-xs leading-6 pr-8'}>
                        {description}
                    </p>
                </div>
            </button>
        </>
    )
}

export default SearchTeacherListItem


