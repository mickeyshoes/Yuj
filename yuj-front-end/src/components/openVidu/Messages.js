/* eslint-disable react/no-array-index-key */
import React, { useState , memo , useEffect , useRef, createRef} from 'react';
import styled from 'styled-components';
import Message from './Message';
import './OpenVidu.css';

const ChatContainer = styled.div`
`;
const Wrapper = styled.div`
    position: absolute;
    background-color: rgba(0, 0, 0, 0.33);
    border-radius: 20px;
    margin: 10px;
    bottom: 10%;
    right:0;
    z-index: 99;
`

const ChatBox = styled.div`
    width: 320px;
    height: 320px;
    z-index: 99;
    overflow-y: scroll;
    word-break: break-all;
    line-break: normal;
    scrollbar-width: none;
    
    ::-webkit-scrollbar{
        display:none;
    }
    p{
        position: static !important;
    }
`
const ChatInputContainer = styled.div`
    position: sticky;
    top: 1000px;
    width: 100%;
    opacity: 0.33;

    display: flex;
    flex-direction: row;
    #chat_message{
        margin-left: 10px;
        margin-bottom: 10px;
        margin-right: 10px;
        width: 100%;
        height: 40px;
    }
`;

const MessageLabel = styled.label`
    position: relative;
    width: 90%;
    input {
        border: none;
        border-radius: 20px;
        padding-left: 20px;
        padding-right: 40px;
    }
    button {
        position: absolute;
        top: 15%;
        right: 5px;
    }
`;

const Messages = ({ session , userName='need to set userName' }) => {
    const [messages, setMessages] = useState([]);
    const inputRef = useRef(null);

    //채팅 받는 부분
    useEffect(() => {
        session.on('signal:chat', (event) => { 
            let chatdata = event.data.split(',');

            if (chatdata[0] !== userName) {
                setMessages(current => {
                    return [...current, {
                        userName: chatdata[0],
                        text: chatdata[1],
                        chatClass: 'messages__item--visitor',
                    }]
                })
            }  
        })
        return () => {
            session.off('signal:chat')
        }
    }, []);

    useEffect(() => {
        session.on("subscribeToSpeechToText", event => {
            if (event.reason === "recognizing") {
                console.log("User " + event.connection.connectionId + " is speaking: " + event.text);
            } else if (event.reason === "recognized") {
                console.log("User " + event.connection.connectionId + " spoke: " + event.text);
            }
        })
    }, []);

    const messageRef = createRef(null);
    const scrollToBottom = () => { 
        console.log(messageRef.current);
        if (messageRef.current) { 
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }

    useEffect(() => { 
        scrollToBottom();
    }, [messages])

    //채팅 보내는 부분
    function sendmessageByClick() {
        const currentText = inputRef.current.value;
        setMessages(current => {
            return [
                ...current,
                {
                    userName,
                    text: currentText,
                    chatClass: 'messages__item--operator',
                },
            ]
        })
        const mySession = session;
        mySession.signal({
            data: `${userName},${inputRef.current.value}`,
            to: [],
            type: 'chat',
        });
        inputRef.current.value = null;
        
    }
    return (
        <Wrapper>
            <ChatBox className="where" ref={messageRef}>
                {
                    messages?.map((message, i) => (
                        <ChatContainer className={`messages__item ${message.chatClass}`} key={'message chat' + userName + i}>
                            <Message text={message.text} userName={message.userName} />
                        </ChatContainer>
                    ))
                }
            </ChatBox>
            <ChatInputContainer>
                    {
                        <MessageLabel>
                            <input
                                ref={inputRef}
                                id="chat_message"
                                type="text"
                                placeholder="내용을 입력하세요"
                            />
                            <button onClick={sendmessageByClick}>
                                <span class="material-symbols-outlined">send</span>
                            </button>
                        </MessageLabel>
                    }
                </ChatInputContainer>
        </Wrapper>
    )
}

export default memo(Messages);