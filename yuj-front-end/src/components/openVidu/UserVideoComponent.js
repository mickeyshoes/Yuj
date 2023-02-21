import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import styled from 'styled-components';
import './UserVideo.css';

const NameTag = styled.p`
    /* width: 150px; */
    /* color: #90859A; */
    font-weight: bold;
`;
export default class UserVideoComponent extends Component {

    componentDidUpdate(){
        console.log('update comp');
    }

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }
    render() {
        console.log('rendering comp');
        return (
            <div style={{padding: '10px'}}>
                {this.props.streamManager !== undefined ? (
                    <div className="streamcomponent relative">
                        <OpenViduVideoComponent type={this.props.type} isActive={this.props.isActive} streamManager={this.props.streamManager}
                            studentVideoRef={this.props.studentVideoRef} studentCanvasRef={this.props.studentCanvasRef}
                            teacherVideoRef={this.props.teacherVideoRef} teacherCanvasRef={this.props.teacherCanvasRef} clientType={this.props.clientType } />
                        <div className='absolute top-4 right-4' style={{color:this.props.type !== "강사" ? '#D2CDBC':'#90859A'}}><NameTag>{this.getNicknameTag() + (this.props.type??'')} 님</NameTag></div>
                    </div>
                ) : null}
            </div>
        );
    }
}
