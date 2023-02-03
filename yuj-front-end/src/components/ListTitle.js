import React from "react";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const ListTitle = ({titleText, onClickEvent}) => {
    return (
        <>
            <div className={'flex items-center justify-center mt-40'}>
                <p className={'text-3xl font-bold text-accent mr-3'}>{titleText}</p>
                <div className={'flex justify-center items-center'} onClick={() => onClickEvent()}>
                    <ArrowCircleRightOutlinedIcon fontSize="large" className={'text-accent hover:cursor-pointer'}/>
                </div>
            </div>
        </>
    )
}

export default ListTitle;