import React from "react";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const ListTitle = ({titleText, onClickEvent}) => {
    return (
        <>
            <div className={'flex items-center justify-center'}>
                <p className={'text-2xl font-bold text-accent mr-3'}>{titleText}</p>
                <div className={'flex justify-center items-center'} onClick={() => onClickEvent()}>
                    <ArrowCircleRightOutlinedIcon fontSize="medium" className={'text-accent hover:cursor-pointer'}/>
                </div>
            </div>
        </>
    )
}

export default ListTitle;