const UserCamera = (props) => {

    const imgTagName = props.imgTagName;
    const canvasTagName = props.canvasTagName;
    const imgSrc = props.imgSrc;
    const width = props.width ? props.width:1000;
    const height = props.height ? props.height:1000;

    return(
        <>
            <div className="video-div">
                <div>
                    <canvas id={canvasTagName} width={width} height={height} style={{zIndex:90}}/>
                </div>
                <img id={imgTagName} src={imgSrc} width={width} height={height} style={{zIndex:-90}} />
            </div>
        </>
    )

}

export default UserCamera;