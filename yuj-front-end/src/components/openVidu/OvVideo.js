import React, { Component } from 'react';
import { connect } from 'react-redux';
import { drawPoints, drawSkeleton } from '../../utils/DrawFunction';
import { calSimilarity, convertToCalculateFormat, estimate } from '../../utils/ModelFunction';
import { ModelParams } from '../../utils/ModelParams';

class OpenViduVideoComponent extends Component {

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
        this.navigateDefaultOrAIDrawing(this.props);
    }

    navigateDefaultOrAIDrawing(state){
        this.width = this.canvasRef.current.widht;
        this.height = this.canvasRef.current.height;
        console.log('in navigateDefaultOrAIDrawing', this.props.model.userInferenceState.inferenceState);

        if(state && !!this.videoRef){
            this.props.streamManager.addVideoElement(this.videoRef.current);
            this.drawVideoWithInferenceInfo();
        }
    }

    async drawVideoWithInferenceInfo(){
        this.context.drawImage(this.videoRef.current, 0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
        if(this.props.model.userInferenceState.inferenceState){
            console.log('inference ready');
            await this.renderResult();
        }
        console.log('animated done');
        this.rafId.current = requestAnimationFrame(this.drawVideoWithInferenceInfo.bind(this));
    }

    async renderResult(){

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
            userPose, teacherPose
        ]).then((poses) => {
            console.log(poses);
            userPose = convertToCalculateFormat(poses[0]);
            teacherPose = convertToCalculateFormat(poses[1]);
            return userPose.keypoints.length >0 && teacherPose.keypoints.length >0 ? calSimilarity(ModelParams.strategy, ...poses):100;
        }).then(point=> point);


        console.log('****************************similarity result: ', result);
        let userColor = result <= ModelParams.SCORE_THRESHHOLD ? "Green" : "White";

        if(userPose.keypoints.length>0){
            drawPoints(this.context, userPose.keypoints, userColor);
            drawSkeleton(this.context, userPose.keypoints, userColor);
        }
        if(teacherPose.keypoints.length>0){
            drawPoints(teacherCanvasContext, teacherPose.keypoints, ModelParams.TEACHER_COLOR);
            drawSkeleton(teacherCanvasContext, teacherPose.keypoints, ModelParams.TEACHER_COLOR);
        }

        return;

    }

    render() {
        // console.log("render start!");

        this.videoRef = this.props.type !== "강사" ? this.props.studentVideoRef : this.props.teacherVideoRef;
        this.canvasRef = this.props.type !== "강사" ? this.props.studentCanvasRef : this.props.teacherCanvasRef; 
        this.rafId = this.props.type !== "강사" ? this.props.studentAnimationFrame : this.props.teacherAnimationFrame;

        this.videoRef = this.props.type === undefined ? React.createRef() : this.videoRef;
        this.canvasRef = this.props.type === undefined ? React.createRef() : this.canvasRef;
        this.rafId = this.props.type === undefined ? React.createRef() : this.rafId;
        

        return (this.props.isActive === true ? 
            (<>
                <canvas width={1920} height={1080} style={{ border:'solid 7px', borderColor: this.props.type !== "강사" ? '#D2CDBC':'#90859A', width:'auto', height:'90vh', borderRadius: '10px'}} ref={this.canvasRef}/>
                <video width={'0px'} height={'0px'} autoPlay = { true} ref = { this.videoRef } style={{visibility : "hidden"}}/>
            </>) 
        :   (<>
                <canvas width={1920} height={1080} style={{ border:'solid 7px', borderColor: this.props.type !== "강사" ? '#D2CDBC':'#90859A', width:'100%', height:'100%', borderRadius: '10px' }} ref={this.canvasRef}/>
                <video width={'0px'} height={'0px'} autoPlay = { true} ref = { this.videoRef } style={{visibility : "hidden"}}/>
            </>))
    }

}

const mapStateToProps = (state) => {return{ model : state.model }}
export default connect(mapStateToProps)(OpenViduVideoComponent);
