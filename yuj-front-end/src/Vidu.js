import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import React, { Component } from 'react';
import './components/openVidu/OpenVidu.css';
import UserVideoComponent from './components/openVidu/UserVideoComponent';
import ListMembers from "./components/openVidu/ListMembers";
import Messages from './components/openVidu/Messages'
import { Base64 } from 'js-base64';

const APPLICATION_SERVER_URL = "http://localhost:5000/";
const OPENVIDU_SERVER_URL = 'http://localhost:4443';
const OPENVIDU_SERVER_SECRET = '123123';

class Vidu extends Component {
    constructor(props) {
        super(props);

        // These properties are in the state's component in order to re-render the HTML whenever their values change
        this.state = {
            mySessionId: '15',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            session: undefined,
            mainStreamManager: undefined,  // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
            publisher: undefined,
            subscribers: [],
            videoMessage: '비디오 끄기',
            voiceMessage: '음소거 하기',
            listMessage: '참가자 켜기',
            chatMessage: '채팅창 켜기',
            messages: [],
            message: '',
            listMembers: [],
            liston: false,
            chaton: false,
        };

        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.switchCamera = this.switchCamera.bind(this);

        this.videoControl = this.videoControl.bind(this);
        this.voiceControl = this.voiceControl.bind(this);
        this.listControl = this.listControl.bind(this);

        this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);

        // this.messageContainer = createRef(null);
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

    handleMainVideoStream(stream) {
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
        console.log('문자 보내기', this.state.subscribers);
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

    async getSessions() {
        let Sessions = await axios.get(
            OPENVIDU_SERVER_URL + '/openvidu/api/sessions',
            {
                headers: {
                    'Authorization': 'Basic ' + Base64.encode('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                },
            }
        );
        Sessions.data.content.forEach((content) => { 
            console.log(content);
        })
    }

    async joinSession() {
        //1. OV api 중 세션 목록 뽑아낵
        //2. 만약 있으면 , 중간에 참가할수 있는 메소드... etc
        //3. 구현
        // --- 1) Get an OpenVidu object ---

        this.OV = new OpenVidu();

        // --- 2) Init a session ---

        this.setState(
            {
                session: this.OV.initSession(),
            },
            () => {
                var mySession = this.state.session;

                // --- 3) Specify the actions when events take place in the session ---

                // On every new Stream received...
                mySession.on('streamCreated', (event) => {
                    // Subscribe to the Stream to receive it. Second parameter is undefined
                    // so OpenVidu doesn't create an HTML video by its own
                    var subscriber = mySession.subscribe(event.stream, undefined);
                    var subscribers = this.state.subscribers;
                    subscribers.push(subscriber);

                    // Update the state with the new subscribers
                    this.setState({
                        subscribers: subscribers,
                    });
                });

                // On every Stream destroyed...
                mySession.on('streamDestroyed', (event) => {
                    // Remove the stream from 'subscribers' array
                    this.deleteSubscriber(event.stream.streamManager);
                });

                // On every asynchronous exception...
                mySession.on('exception', (exception) => {
                    console.warn(exception);
                });

                // --- 4) Connect to the session with a valid user token ---

                // Get a token from the OpenVidu deployment
                this.getToken().then((token) => {
                    // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
                    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
                    mySession.connect(token, { clientData: this.state.myUserName })
                        .then(async () => {
                            // --- 5) Get your own camera stream ---

                            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                            // element: we will manage it on our own) and with the desired properties
                            let publisher = await this.OV.initPublisherAsync(undefined, {
                                audioSource: undefined, // The source of audio. If undefined default microphone
                                videoSource: undefined, // The source of video. If undefined default webcam
                                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                                resolution: '640x480', // The resolution of your video
                                frameRate: 30, // The frame rate of your video
                                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                                mirror: false, // Whether to mirror your local video or not
                            });

                            // --- 6) Publish your stream ---
                            mySession.publish(publisher);

                            // Obtain the current video device in use
                            var devices = await this.OV.getDevices();
                            var videoDevices = devices.filter(device => device.kind === 'videoinput');
                            var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
                            var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

                            // Set the main video in the page to display our webcam and store our Publisher
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
                console.log('mySession : ', mySession);
            },
        );
    }

    chattoggle() { 
        this.setState({ chaton: !this.state.chaton });
        if (this.state.chaton === false) {
            this.setState({ chatMessage: '채팅창 끄기' });
        } else { 
            this.setState({ chatMessage: '채팅창 켜기' });
        }
    }

    leaveSession() {
        // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
        }

        // Empty all properties...
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            mainStreamManager: undefined,
            publisher: undefined
        });
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
            // 현재 세션에 참가하고 있는 사람들의 세션 아이디, 비디오, 오디오 상태 확인
            let listMembersDemo = [];
            Sessions.data.content.forEach((content) => {
                content.connections.content.map((c) => {
                    // console.log(c.id); // 세션 아이디
                    // console.log(c.publishers[0].mediaOptions.videoActive); // 해당 세션 아이디의 비디오 사용 여부
                    // console.log(c.publishers[0].mediaOptions.audioActive); // 해당 세션 아이디의 오디오 사용 여부
                    let member = {};
                    member[0] = c.id;
                    member[1] = c.publishers[0].mediaOptions.videoActive;
                    member[2] = c.publishers[0].mediaOptions.audioActive;
                    listMembersDemo.push(member);
                });
                this.setState(() => ({
                    listMembers: listMembersDemo
                }));
            })
        } else { 
            this.setState({ listMessage: '참가자 켜기' });
        }
    }

    render() {
        const mySessionId = this.state.mySessionId;
        const myUserName = this.state.myUserName;

        return (
            <div className="container">
                <div>
                    <button onClick={ this.getSessions}>getSessions</button>
                </div>
                {this.state.session === undefined ? (
                    <div id="join">
                        <div id="img-div">
                            <img src="resources/images/yujLogo.png" alt="yuj logo" />
                        </div>
                        <div id="join-dialog" className="jumbotron vertical-center">
                            <h1> Join a video session </h1>
                            <form className="form-group" onSubmit={this.joinSession}>
                                <p>
                                    <label>참가자명: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="userName"
                                        value={myUserName}
                                        onChange={this.handleChangeUserName}
                                        required
                                    />
                                </p>
                                <p>
                                    <label> 세션 종류: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="sessionId"
                                        value={mySessionId}
                                        onChange={this.handleChangeSessionId}
                                        required
                                    />
                                </p>
                                <p className="text-center">
                                    <input className="btn btn-lg btn-success" name="commit" type="submit" value="JOIN" />
                                </p>
                            </form>
                        </div>
                    </div>
                ) : null}

                {this.state.session !== undefined ? (
                    <div id="session">
                        <div id="session-header">
                            <h1 id="session-title">{mySessionId}</h1>
                        </div>

                        {this.state.mainStreamManager !== undefined ? (
                            <div id="main-video" className="col-md-6">
                                <UserVideoComponent streamManager={this.state.mainStreamManager} />
                                <div>
                                    {this.state.liston ? (
                                        <div>
                                            {
                                                this.state.session ?
                                                    <ListMembers listMembers={this.state.listMembers} /> : null
                                            }
                                        </div>
                                    ): null}
                                </div>
                                <div className="chatbox">
                                    {this.state.chaton ? (
                                        <div className="chat chatbox__support chatbox--active">
                                            <div className="chat chatbox__header" />
                                                <div className="chatbox__messages" ref="chatoutput">
                                                    {
                                                        this.state.session ? 
                                                            <Messages session={this.state.session} userName={this.state.myUserName} /> : null
                                                    }
                                                <div />
                                            </div>
                                        </div>
                                    ) : null}
                                </div>

                                <button class="clickControl" onClick={this.videoControl}><h3>{this.state.publisher.properties.publishVideo === true ?
                                    <span class="material-symbols-outlined">videocam</span> : <span class="material-symbols-outlined">videocam_off</span>}  {this.state.videoMessage}</h3>
                                </button>
                                <button class="clickControl" onClick={this.voiceControl}><h3>{this.state.publisher.properties.publishAudio === true ?
                                    <span class="material-symbols-outlined">mic</span> : <span class="material-symbols-outlined">mic_off</span>}  {this.state.voiceMessage}</h3>
                                </button>
                                <button class="clickControl" onClick={this.listControl}><h3>{this.state.liston === true ?
                                    <span class="material-symbols-outlined">person</span> : <span class="material-symbols-outlined">person_off</span>} {this.state.listMessage}</h3>
                                </button>
                                <button class="clickControl" onClick={this.chattoggle}><h3>{this.state.chaton === true ?
                                    <span class="material-symbols-outlined">chat</span> : <span class="material-symbols-outlined">speaker_notes_off</span>} {this.state.chatMessage}</h3>
                                </button>
                                <button class="clickControl" onClick={this.leaveSession}><h3><span class="material-symbols-outlined">exit_to_app</span> 종료</h3></button>
                            </div>
                        ) : null}
                        <div id="video-container" className="col-md-12">
                            {this.state.publisher !== undefined ? (
                                <div className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                                    <UserVideoComponent
                                        streamManager={this.state.publisher} />
                                </div>
                            ) : null}
                            {this.state.subscribers.map((sub, i) => (
                                <div key={i} className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(sub)}>
                                    <UserVideoComponent streamManager={sub} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }


    /**
     * --------------------------------------------
     * GETTING A TOKEN FROM YOUR APPLICATION SERVER
     * --------------------------------------------
     * The methods below request the creation of a Session and a Token to
     * your application server. This keeps your OpenVidu deployment secure.
     * 
     * In this sample code, there is no user control at all. Anybody could
     * access your application server endpoints! In a real production
     * environment, your application server must identify the user to allow
     * access to the endpoints.
     * 
     * Visit https://docs.openvidu.io/en/stable/application-server to learn
     * more about the integration of OpenVidu in your application server.
     */
    async getToken() {
        const sessionId = await this.createSession(this.state.mySessionId);
        return await this.createToken(sessionId);
    }

    async createSession(sessionId) {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
            headers: { 'Content-Type': 'application/json', },
        });
        console.log("createSession 함수 호출", response.data);
        return response.data; // The sessionId
    }

    async createToken(sessionId) {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; // The token
    }
}

export default Vidu;
