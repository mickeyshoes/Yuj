import { useEffect, useRef, useState } from "react";

const ViduVideoCanvasComponent = (props) =>{

    const [curProps, setCurProps] = useState(props);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(()=>{
        if(this.props && !!this.videoRef){
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
        toggleCanvasSetting(this.props);
    });

    useEffect(()=>{
        if(curProps && !! this.videoRef){
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }

        toggleCanvasSetting(curProps);

    }, [curProps]);

    function toggleCanvasSetting(props){

        if(props.isActive){
            canvasRef.current.style.width = 'auto';
            canvasRef.current.style.height = '90vh';
        }
        else{
            canvasRef.current.style.width = '100%';
            canvasRef.current.style.height = '100%';
        }
    }


    return(
        <>
            

            <canvas ref={canvasRef}></canvas>
            <video ref={videoRef}></video>
        </>
    )


};


export default ViduVideoCanvasComponent;