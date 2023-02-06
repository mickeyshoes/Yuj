import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import styled from 'styled-components';
import './UserVideo.css';

const NameTag = styled.p`
    /* width: 150px; */
    color:white;
    font-weight: bold;
`;
export default class UserVideoComponent extends Component {
    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }
    render() {
        return (
            <div style={{padding: '10px'}}>
                {this.props.streamManager !== undefined ? (
                    <div className="streamcomponent">
                        <OpenViduVideoComponent isActive={ this.props.isActive} streamManager={this.props.streamManager} />
                        <div><NameTag>{this.getNicknameTag()} 님</NameTag></div>
                    </div>
                ) : null}
            </div>
        );
    }
}
