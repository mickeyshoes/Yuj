import React, { Component } from 'react';
import { connect } from 'react-redux';
import { drawPoints, drawSkeleton } from '../../utils/DrawFunction';
import { calSimilarity, convertToCalculateFormat, estimate } from '../../utils/ModelFunction';
import { ModelParams } from '../../utils/ModelParams';

class OpenViduVideoComponent extends Component {

    /*
    props에 담겨 오는 streamManager 를
    하위 컴포넌트에 넘겨주고
    update & mount cycle에 
    video element를 제어해야 할 것 같다.
    */
    constructor(props) {
        super(props);
        this.videoRef = null;
        this.canvasRef = null;
        this.context = null;
        this.width = null;
        this.height = null;
        this.rafId = null;
    }

    componentDidUpdate(props) {
        this.navigateDefaultOrAIDrawing(props);
        console.log('did update ref check!', this.props.studentVideoRef, this.props.studentCanvasRef, this.props.teacherVideoRef, this.props.teacherCanvasRef);

    }

    componentDidMount() {
        this.context = this.canvasRef.current.getContext('2d');
        console.log(this.props.type,' : did mount ref check!', this.props.studentVideoRef, this.props.studentCanvasRef, this.props.teacherVideoRef, this.props.teacherCanvasRef);
        // console.log(this.props.type !== "강사" ? this.props.studentVideoRef : this.props.teacherVideoRef);
        this.navigateDefaultOrAIDrawing(this.props);
    }

    /*
    순서
    1. infState 가 토글되어 있는지 확인(undefined 아닌거도 체크할 것)
    2. inference and save values
    3. if inference && User -> draw
    4. if skeleton -> draw teacher
    
    */

    navigateDefaultOrAIDrawing(state){
        this.width = this.canvasRef.current.widht;
        this.height = this.canvasRef.current.height;
        console.log('in navigateDefaultOrAIDrawing', this.props.model.userInferenceState.inferenceState);

        if(state && !!this.videoRef){
            this.props.streamManager.addVideoElement(this.videoRef.current);

            const inferenceFlag = this.props.model.userInferenceState.inferenceState;
            if(inferenceFlag && this.props.type !== "강사" && this.props.type !== undefined){ this.drawVideoWithInferenceInfo() }
            else { this.drawVideoToCanvas() }
        }
    }

    async drawVideoWithInferenceInfo(){
        console.log('inference ready');
        await this.renderResult();    
        if(this.props.model.userInferenceState.inferenceState){
            this.rafId = requestAnimationFrame(this.drawVideoWithInferenceInfo.bind(this));
        }
    }
    
    drawVideoToCanvas() {
        if(this.rafId) {cancelAnimationFrame(this.rafId)}
        // this.context.beginPath();
        // console.log('in default animation ', this.props.model.userInferenceState.inferenceState, "type : ", this.props.type);
        this.context.drawImage(this.videoRef.current, 0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
        // console.log(this.videoRef.current);
        requestAnimationFrame(this.drawVideoToCanvas.bind(this));
    }

    async renderResult(){

        // console.log(this.videoRef.current);

        let teacherVideo = this.props.teacherVideoRef;
        let teacherCanvas = this.props.teacherCanvasRef;
        console.log(this.props.type, ' : 85line',teacherVideo, teacherCanvas);
        console.log(this.props.type, ' : 86line',teacherVideo.current, teacherCanvas.current);
        let teacherCanvasContext = teacherCanvas.current.getContext('2d');


        this.context.drawImage(this.videoRef.current, 0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
        teacherCanvasContext.drawImage(teacherVideo.current, 0,0, this.canvasRef.current.width, this.canvasRef.current.height);
        
        let userPose = await estimate(this.props.model.model, this.canvasRef.current);
        let teacherPose = await estimate(this.props.model.model, teacherCanvas.current);

        console.log('user pose ', userPose);
        console.log('teacher pose ', teacherPose);


        let result = await Promise.all([
            // convertToCalculateFormat(userPose),
            // convertToCalculateFormat(teacherPose)
            userPose, teacherPose
        ]).then((poses) => {
            console.log(poses);
            userPose = convertToCalculateFormat(poses[0]);
            teacherPose = convertToCalculateFormat(poses[1]);
            return userPose.keypoints.length >0 && teacherPose.keypoints.length >0 ? calSimilarity(ModelParams.strategy, ...poses):100;
        }).then(point=> point);


        // let similarity = (userPose.keypoints.length>0) && (teacherPose.keypoints.length>0) ? (await calSimilarity(ModelParams.strategy, userPose, teacherPose)) : 100;
        // console.log('similarity : ', similarity);
        console.log('****************************similarity result: ', result);
        let userColor = result <= ModelParams.SCORE_THRESHHOLD ? "Green" : "White";

        if(userPose.keypoints.length>0){
            // userPose = convertToCalculateFormat(userPose);
            drawPoints(this.context, userPose.keypoints, userColor);
            drawSkeleton(this.context, userPose.keypoints, userColor);
        }
        if(teacherPose.keypoints.length>0){
            // teacherPose = convertToCalculateFormat(teacherPose);
            drawPoints(teacherCanvasContext, teacherPose.keypoints, userColor);
            drawSkeleton(teacherCanvasContext, teacherPose.keypoints, userColor);
        }

        return;

    }

    render() {
        console.log("render start!");
        console.log("누구세요? ", this.props.type);

        this.videoRef = this.props.type !== "강사" ? this.props.studentVideoRef : this.props.teacherVideoRef;
        this.canvasRef = this.props.type !== "강사" ? this.props.studentCanvasRef : this.props.teacherCanvasRef; 

        this.videoRef = this.props.type === undefined ? React.createRef() : this.videoRef;
        this.canvasRef = this.props.type === undefined ? React.createRef() : this.canvasRef;

        return (this.props.isActive === true ? 
            (<>
                <canvas width={1920} height={1080} style={{ border:'solid', width:'auto', height:'90vh' }} ref={this.canvasRef}/>
                <video width={'0px'} height={'0px'} autoPlay = { true} ref = { this.videoRef } style={{visibility : "hidden"}}/>
            </>) 
        :   (<>
                <canvas width={1920} height={1080} style={{ border:'solid', width:'100%', height:'100%' }} ref={this.canvasRef}/>
                <video width={'0px'} height={'0px'} autoPlay = { true} ref = { this.videoRef } style={{visibility : "hidden"}}/>
            </>))
    }

}

const mapStateToProps = (state) => {return{ model : state.model }}
export default connect(mapStateToProps)(OpenViduVideoComponent);
