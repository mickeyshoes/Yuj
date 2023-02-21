import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLectureActive } from '../stores/lectureSlice';
import styled from 'styled-components';
import '../components/openVidu/OpenVidu.css';
import UserVideoComponent from '../components/openVidu/UserVideoComponent';
import ListMembers from "../components/openVidu/ListMembers";
import Messages from '../components/openVidu/Messages'
import { Base64 } from 'js-base64';
import { SignalCellularNull } from "@mui/icons-material";
import { Navigate } from 'react-router-dom';

const APPLICATION_SERVER_URL = "https://i8a504.p.ssafy.io";
const OPENVIDU_SERVER_URL = 'https://i8a504.p.ssafy.io';
// const APPLICATION_SERVER_URL = "https://i8a504.p.ssafy.io/api/";
// const OPENVIDU_SERVER_URL = 'http://localhost:4443';
const OPENVIDU_SERVER_SECRET = '123123';

class Vidu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mySessionId: props.navigationState.mySessionId,
            myUserName: props.navigationState.myUserName,
            myUserType: props.navigationState.myUserType,

            session: undefined,
            mainStreamManager: undefined,
            publisher: undefined,
            subscribers: [],

            // 최초 방문 체크
            isVisited: false,

            // 하단 footer에 표시되는 문구
            videoMessage: '비디오 끄기',
            voiceMessage: '음소거 하기',
            listMessage: '참가자 켜기',
            chatMessage: '채팅창 켜기',

            // 채팅 관련
            messages: [],
            message: '',
            chaton: false,

            // 참가자 관련
            listMembers: [],
            liston: false,

            // 선택 여부
            isActive: false,
        };

        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.switchCamera = this.switchCamera.bind(this);

        this.videoControl = this.videoControl.bind(this);
        this.voiceControl = this.voiceControl.bind(this);
        this.listControl = this.listControl.bind(this);
        this.exitMember = this.exitMember.bind(this);

        this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangeUserType = this.handleChangeUserType.bind(this);
        this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);

        this.sendmessageByClick = this.sendmessageByClick.bind(this);
        this.sendmessageByEnter = this.sendmessageByEnter.bind(this);
        this.handleChatMessageChange = this.handleChatMessageChange.bind(this);

        this.chattoggle = this.chattoggle.bind(this);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.onbeforeunload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
        this.leaveSession();
    }

    onbeforeunload(event) {
        this.leaveSession();
    }

    handleChangeSessionId(e) {
        this.setState({
            mySessionId: e.target.value,
        });
    }

    handleChangeUserName(e) {
        this.setState({
            myUserName: e.target.value,
        });
    }

    handleChangeUserType(e) { 
        this.setState({
            myUserType: e.target.value,
        })
    }

    handleMainVideoStream(stream) {
        this.setState({ isActive: !this.state.isActive });
        if (this.state.mainStreamManager !== stream) {
            this.setState({
                mainStreamManager: stream
            });
        }
    }

    deleteSubscriber(streamManager) {
        let subscribers = this.state.subscribers;
        let index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            subscribers.splice(index, 1);
            this.setState({
                subscribers: subscribers,
            });
        }
    }

    handleChatMessageChange(e) {
        this.setState({
            message: e.target.value,
        });
    }

    sendmessageByClick() {
        // console.log('문자 보내기', this.state.subscribers);
        this.setState({
            messages: [
                ...this.state.messages,
                {
                    userName: this.state.myUserName,
                    text: this.state.message,
                    chatClass: 'messages__item--operator',
                },
            ],
        });
        const mySession = this.state.session;
    
        mySession.signal({
            data: `${this.state.myUserName},${this.state.message}`,
            to: [],
            type: 'chat',
        });
    
        this.setState({
            message: '',
        });
    }
    
    sendmessageByEnter(e) {
        if (e.key === 'Enter') {
            this.setState({
                messages: [
                    ...this.state.messages,
                    {
                        userName: this.state.myUserName,
                        text: this.state.message,
                        chatClass: 'messages__item--operator',
                    },
                ],
            });
            const mySession = this.state.session;
    
            mySession.signal({
                data: `${this.state.myUserName},${this.state.message}`,
                to: [],
                type: 'chat',
            });
    
            this.setState({
                message: '',
            });
        }
    }

    // 세션 생성하는 과정
    async joinSession() {
        this.OV = new OpenVidu();

        this.setState(
            {
                session: this.OV.initSession(),
            },
            () => {
                var mySession = this.state.session;

                mySession.on('streamCreated', (event) => {
                    var subscriber = mySession.subscribe(event.stream, undefined);
                    var subscribers = this.state.subscribers;
                    subscribers.push(subscriber);

                    this.setState({
                        subscribers: subscribers,
                    });
                });

                mySession.on('signal:chat', (event) => { 
                    let chatdata = event.data.split(',');
        
                    if (chatdata[0] !== this.state.myUserName) {
                        this.setState({
                            messages: [...this.state.messages, {
                                userName: chatdata[0],
                                text: chatdata[1],
                                chatClass: 'messages__item--visitor'
                            }]
                        });
                    }
                });

                mySession.on('streamDestroyed', (event) => {
                    this.deleteSubscriber(event.stream.streamManager);
                });

                mySession.on('exception', (exception) => {
                    console.warn(exception);
                });

                this.getToken().then((token) => {
                    // 첫번째 인자 (token) : 오픈비두로부터 받은 토큰, 두번째 인자 : 필요한 데이터 커스텀 가능
                    mySession.connect(token, { clientData: this.state.myUserName, clientType: this.state.myUserType })
                        .then(async () => {
                            let publisher = await this.OV.initPublisherAsync(undefined, {
                                audioSource: undefined, // The source of audio. If undefined default microphone
                                videoSource: undefined, // The source of video. If undefined default webcam
                                publishAudio: true, // 최초 입장 시 오디오 설정 여부
                                publishVideo: true, // 최초 입장 시 비디오 설정 여부
                                resolution: '640x480', // 영상 해상도 "320x240", "640x480", "1280x720"
                                frameRate: 40, // 초당 프레임 수
                                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                                mirror: true, // 미러 버전
                            });

                            mySession.publish(publisher);

                            var devices = await this.OV.getDevices();
                            var videoDevices = devices.filter(device => device.kind === 'videoinput');
                            var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
                            var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

                            this.setState({
                                currentVideoDevice: currentVideoDevice,
                                mainStreamManager: publisher,
                                publisher: publisher,
                            });
                        })
                        .catch((error) => {
                            console.log('There was an error connecting to the session:', error.code, error.message);
                        });
                });
                // console.log('mySession : ', mySession);
            },
        );
    }

    //채팅창 열고 닫기
    chattoggle() { 
        this.setState({ chaton: !this.state.chaton });
        if (this.state.chaton === false) {
            this.setState({ chatMessage: '채팅창 끄기' });
        } else { 
            this.setState({ chatMessage: '채팅창 켜기' });
        }
    }

    async leaveSession() {
        // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
        }

        //수업중인 강의 active false로 바꾸기
        this.props.dispatch(updateLectureActive(
            {
                lectureId: this.state.mySessionId,
                active: false,
                userId: this.props.userInfo.userId
            }
        ))

        // Empty all properties...
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: undefined,
            myUserName: undefined,
            mainStreamManager: undefined,
            publisher: undefined
        });

        await axios.delete(
            '/openvidu/api/sessions/' + this.state.mySessionId,
            {
                headers: {
                    'Authorization': 'Basic ' + Base64.encode('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                },
            }
        );
    }

    async switchCamera() {
        try {
            const devices = await this.OV.getDevices()
            var videoDevices = devices.filter(device => device.kind === 'videoinput');

            if (videoDevices && videoDevices.length > 1) {

                var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

                if (newVideoDevice.length > 0) {
                    // Creating a new publisher with specific videoSource
                    // In mobile devices the default and first camera is the front one
                    var newPublisher = this.OV.initPublisher(undefined, {
                        videoSource: newVideoDevice[0].deviceId,
                        publishAudio: true,
                        publishVideo: true,
                        mirror: true
                    });

                    //newPublisher.once("accessAllowed", () => {
                    await this.state.session.unpublish(this.state.mainStreamManager)

                    await this.state.session.publish(newPublisher)
                    this.setState({
                        currentVideoDevice: newVideoDevice[0],
                        mainStreamManager: newPublisher,
                        publisher: newPublisher,
                    });
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
    async videoControl() { 
        // 비디오 출력 여부를 관리하는 상태변수
        // console.log(this.state.publisher.properties.publishVideo);
        const { publisher } = this.state;
        if (publisher.properties.publishVideo === false) {
            publisher.properties.publishVideo = true;
            await publisher.publishVideo(true);
            this.setState(() => ({
                videoMessage: '비디오 끄기'
            }));
        } else { 
            publisher.properties.publishVideo = false;
            await publisher.publishVideo(false);
            this.setState(() => ({
                videoMessage: '비디오 켜기'
            }));
        }
    }
    async voiceControl() { 
        // 음성 출력 여부를 관리하는 상태변수
        const { publisher } = this.state;
        if (this.state.publisher.properties.publishAudio === false) {
            publisher.properties.publishAudio = true;
            await this.state.publisher.publishAudio(true);
            this.setState(() => ({
                voiceMessage: '음소거 하기'
            }));
        } else { 
            publisher.properties.publishAudio = false;
            await this.state.publisher.publishAudio(false);
            this.setState(() => ({
                voiceMessage: '음소거 해제'
            }));
        }
    }

    async listControl() { 
        this.setState({ liston: !this.state.liston });
        if (this.state.liston === false) {
            this.setState({ listMessage: '참가자 끄기' });
            let Sessions = await axios.get(
                OPENVIDU_SERVER_URL + '/openvidu/api/sessions',
                {
                    headers: {
                        'Authorization': 'Basic ' + Base64.encode('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                    },
                }
            );
            // console.log(Sessions);
            // 현재 세션에 참가하고 있는 사람들의 세션 아이디, 비디오, 오디오 상태 확인
            let listMembersDemo = [];
            Sessions.data.content.forEach((content) => {
                if (this.state.mySessionId === content.id) {
                    content.connections.content.map((c) => {
                        // console.log(c.id); // 세션 아이디
                        // console.log(JSON.parse(c.clientData).clientType); // 커스텀 한 데이터 값 : 강사/수강생 여부
                        // console.log(c.publishers[0].mediaOptions.videoActive); // 해당 세션 아이디의 비디오 사용 여부
                        // console.log(c.publishers[0].mediaOptions.audioActive); // 해당 세션 아이디의 오디오 사용 여부
                        let member = {};
                        member[0] = JSON.parse(c.clientData).clientData;
                        member[1] = JSON.parse(c.clientData).clientType;
                        member[2] = c.publishers[0].mediaOptions.videoActive;
                        member[3] = c.publishers[0].mediaOptions.audioActive;
                        member[4] = c.id;
                        member[5] = this.state.myUserType;
                        
                        listMembersDemo.push(member);
                    });
                }
                this.setState(() => ({
                    listMembers: listMembersDemo
                }));
                
            })
        } else { 
            this.setState({ listMessage: '참가자 켜기' });
        }
    }

    async exitMember(connectionId) { 
        await axios.delete(
            OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + this.state.mySessionId + '/connection/' + connectionId,
            {
                headers: {
                    'Authorization': 'Basic ' + Base64.encode('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                },
            }
        )
    }

    render() {
        if(this.state.session === undefined && this.state.isVisited === false){
            this.joinSession();
            this.setState({ isVisited: true });
        }

        const VideoContainer = styled.div`
           
            background: #F8F6F3;
            justify-content: center;
            top:0px;
            width: 100vw;
            height: 92vh;
            overflow-y: scroll;
        `;

        const VideoGrid = styled.div`
            display: flex !important;
            flex-wrap: wrap !important;
            align-items: center;
            margin-top: 10%;

            width: 100%;
            height: 100%;
        `;

        const ButtonContainer = styled.div`
            width: 100%;
            height: full;
            position: fixed;
            bottom: 1.3%;

            display: flex !important;
            clear: both;
            justify-content: space-evenly !important;
        `;
        return (
            <div>
                {this.state.session === undefined && this.state.isVisited === true ? (
                    <Navigate to='/studio'></Navigate>
                ) : null}
                {this.state.session !== undefined ? (
                    <div>
                        <div>
                            {this.state.liston ? (
                                <div>
                                    {this.state.session ?
                                        <ListMembers listMembers={this.state.listMembers} exitMember={ this.exitMember}/> : SignalCellularNull}
                                </div>
                            ) : null}
                        </div>
                        <div>
                            {this.state.chaton ? (
                                <div className="chatbox__messages" ref="chatoutput">
                                    {
                                        this.state.session ?
                                            <Messages session={this.state.session} messages={this.state.messages} setMessages={(newMessage) => this.setState({messages:[...this.state.messages,newMessage]})} userName={this.state.myUserName} /> : null
                                    }
                                </div>
                            ) : null}
                        </div>
                        
                        <VideoContainer>
                            <div>
                                {this.state.mainStreamManager !== undefined && this.state.isActive === true ? (
                                    <div style={{ position: 'relative', width: 'auto' }} onClick={() => { this.handleMainVideoStream(this.state.mainStreamManager) }}>
                                        <UserVideoComponent isActive={ this.state.isActive} streamManager={this.state.mainStreamManager} />
                                    </div>
                                ) : null}
                            </div>
                            <VideoGrid>
                                {this.state.publisher !== undefined ? (
                                    <div style={{ position: 'relative', width: '33%' }} onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                                        <UserVideoComponent streamManager={this.state.publisher} />
                                    </div>
                                ): null}
                                {this.state.subscribers.map((sub, i) => (
                                    <div key={i} style={{ position: 'relative', width:'33%'}} onClick={() => this.handleMainVideoStream(sub)}>
                                        <UserVideoComponent streamManager={sub} onClick={() => { console.log('클릭',sub);} } />
                                    </div>
                                ))}
                            </VideoGrid>
                        </VideoContainer>
                        {this.state.mainStreamManager !== undefined ? (
                            <ButtonContainer>
                                <img className='yuj-logo h-10' alt='No Image' src='/assets/YujMainLogo.svg' style={{  }}></img>
                                <button className="clickControl" style={{margin: '0', height: '2.5rem'}} onClick={this.videoControl}><div className="flex w-full justify-center">{this.state.publisher.properties.publishVideo === true ?
                                    <span className="material-symbols-outlined">videocam</span> : <span className="material-symbols-outlined">videocam_off</span>}  &nbsp;&nbsp;  {this.state.videoMessage}</div>
                                </button>
                                <button className="clickControl" style={{margin: '0', height: '2.5rem'}} onClick={this.voiceControl}><div className="flex w-full justify-center">{this.state.publisher.properties.publishAudio === true ?
                                    <span className="material-symbols-outlined">mic</span> : <span className="material-symbols-outlined">mic_off</span>} &nbsp;&nbsp; {this.state.voiceMessage}</div>
                                </button>
                                <button className="clickControl" style={{margin: '0', height: '2.5rem'}} onClick={this.listControl}><div className="flex w-full justify-center">{this.state.liston === true ?
                                    <span className="material-symbols-outlined">person</span> : <span className="material-symbols-outlined">person_off</span>} &nbsp;&nbsp; {this.state.listMessage}</div>
                                </button>
                                <button className="clickControl" style={{margin: '0', height: '2.5rem'}} onClick={this.chattoggle}><div className="flex w-full justify-center">{this.state.chaton === true ?
                                    <span className="material-symbols-outlined">chat</span> : <span className="material-symbols-outlined">speaker_notes_off</span>} &nbsp;&nbsp; {this.state.chatMessage}</div>
                                </button>
                                <button className="clickControl" style={{margin: '0', height: '2.5rem'}} onClick={this.leaveSession}><div className="flex w-full justify-center"><span className="material-symbols-outlined">exit_to_app</span> &nbsp;&nbsp; 종료</div></button>
                            </ButtonContainer>
                        ) : null}
                    </div>
                ) : null}
            </div>
        );
    }

    async getToken() {
        const sessionId = await this.createSession(this.state.mySessionId);
        return await this.createToken(sessionId);
    }

    async createSession(sessionId) {
        const response = await axios.post(OPENVIDU_SERVER_URL + '/api/openvidu/sessions', { customSessionId: sessionId }, {
            headers: { 'Content-Type': 'application/json', },
        });
        // console.log("createSession 함수 호출", response.data);
        return response.data; // The sessionId
    }
    
    // 백앤드로부터 토큰 요청 (백앤드에서 오픈비두로부터 토큰 받음)
    async createToken(sessionId) {
        const response = await axios.post(OPENVIDU_SERVER_URL + '/api/openvidu/sessions/' + sessionId + '/connections', {}, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; // The token
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.user.userInfo
});

export default connect(mapStateToProps)(Vidu);
