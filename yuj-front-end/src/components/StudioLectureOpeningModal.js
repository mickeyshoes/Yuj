import React from 'react';
import AddIcon from "@mui/icons-material/Add";


const StudioLectureOpeningModal = ({title, content, buttons=[]}) => {

  return (
    <>
        <input type="checkbox" id="lecture-opening-modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{content}</p>
                <div className="modal-action">
                {
                    buttons.map((btn, idx) => 
                        <ModalBtn 
                            key={idx}
                            text={btn.text}
                            className={btn.className}
                            style={btn.style}
                            onClickEvent={btn.onClickEvent}
                        />
                    )
                }
                </div>
            </div>
        </div>
    </>
  );
}

const StudioLectureOpeningModalBtn = ({text, className, style, onClickEvent}) => {
    return (
        <>
            <label htmlFor="lecture-opening-modal" onClick={() => onClickEvent ? onClickEvent() : null} style={style} className={"btn "+className}><AddIcon className="mr-2 text-white" />{text}</label>
        </>
    )
}

const ModalBtn = ({text, className, style, onClickEvent}) => {
    return (
        <>
            <label htmlFor="lecture-opening-modal" onClick={() => onClickEvent ? onClickEvent() : null} style={style} className={"btn "+className}>{text}</label>
        </>
    )
}

export { StudioLectureOpeningModal, StudioLectureOpeningModalBtn };