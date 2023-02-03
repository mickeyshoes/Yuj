import React from "react";

const FileInput = ({labelText, className}) => {
    return (
        <>  
            <div className={"form-control w-full "+(className? className:'max-w-lg')}>
                <label className="label">
                    <span className="label-text">{labelText ? labelText:''}</span>
                </label>
                <input type="file" className="file-input file-input-sm file-input-primary w-full" />        
            </div>
        </>
    )   
}

export default FileInput;