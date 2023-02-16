import { useEffect, useRef } from "react";
import { useInterval } from "../utils/Util";

const VideoCanvas = (props) => {

    const videoTagName = props.videoTagName;

    const canvasTagName = props.canvasTagName;
    
    const width = props.isActive ? 'auto' : '100%';
    const height = props.isActive ? '90vh' : '100%';

    //use this values before render
    const canvasRef = useRef(null);
    const videoRef = useRef(props.videoRef);

    useEffect(()=>{console.log('mounted')})

    useInterval(()=>{
        // console.log(videoRef);
        console.log('ㅜㅜ');
        if(canvasRef.current && videoRef.current){
            // console.log(videoRef.current);
            const context = canvasRef.current.getContext('2d');
            context.beginPath();
            context.drawImage(videoRef.current, 0, 0, width, height);
            console.log(context)
        }
    }, videoRef.current? 100:null);

    return(
        <>
            <canvas id={canvasTagName} width={width} height={height} ref={canvasRef}/>
            <video id={videoTagName} width={0} height={0} 
                    autoPlay={true} style={{visibility:'hidden'}}/>
            <p>어쩔티비</p>
        </>
    )

}

export default VideoCanvas;