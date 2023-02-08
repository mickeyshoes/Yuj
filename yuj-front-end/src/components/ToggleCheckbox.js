const ToggleCheckbox = (props) =>{

    const labelText = props.text;
    const booleanField = props.boolean;
    const toggleColor = props.color;
    const toggleEvent = props.event;

    return(
        <>
            <label className="cursor-pointer label">
                <span className="label-text">{labelText}</span> 
                <input type="checkbox" className={`toggle ${toggleColor}`} checked={booleanField} onClick={(e) => toggleEvent(e)} readOnly/>
            </label>
        </>
    )
};


export default ToggleCheckbox;