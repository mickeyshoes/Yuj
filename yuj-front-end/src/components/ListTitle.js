import React from "react";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const ListTitle = ({titleText, onClickEvent, className}) => {
    return (
        <>
            <div className={'flex items-center justify-center'}>
                <p className={'text-accent mr-3 '+className}>{titleText}</p>
                <div className={'flex justify-center items-center'} onClick={() => onClickEvent()}>
                    <ArrowCircleRightOutlinedIcon fontSize="medium" className={'text-accent hover:cursor-pointer'}/>
                </div>
            </div>
        </>
    )
}

export default ListTitle;