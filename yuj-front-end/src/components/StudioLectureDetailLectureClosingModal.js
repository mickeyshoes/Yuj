import React from 'react';

const StudioLectureDetailLectureClosingModal = ({title, content, buttons=[]}) => {

  return (
    <>
        <input type="checkbox" id="lecture-closing-modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{content}</p>
                <div className="modal-action">
                {
                    buttons.map((btn, idx) => 
                        <StudioLectureDetailLectureClosingModalBtn 
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

const StudioLectureDetailLectureClosingModalBtn = ({text, className, style, onClickEvent}) => {
    return (
        <>
            <label htmlFor="lecture-closing-modal" onClick={() => onClickEvent ? onClickEvent() : null} style={style} className={"btn "+className}>{text}</label>
        </>
    )
}

export { StudioLectureDetailLectureClosingModal, StudioLectureDetailLectureClosingModalBtn };