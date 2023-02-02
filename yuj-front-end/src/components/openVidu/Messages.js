/* eslint-disable react/no-array-index-key */
import React, { useState , memo , useEffect , useRef, createRef} from 'react';
import styled from 'styled-components';
import Message from './Message';
import './OpenVidu.css';

const ChatContainer = styled.div`
`;
const ChatBox = styled.div`
    position: absolute;
    background-color: rgba(0, 0, 0, 0.33);
    border-radius: 20px;
    width: 500px;
    height: 400px;

    overflow-y: scroll;
    word-break: break-all;
    line-break: normal;
    position: absolute;
    bottom: 67%;
    right:0;
    p{
        position: static !important;
    }
`
const ChatInputContainer = styled.div`
    position: sticky;
    top: 1000px;
    width: 100%;
    opacity: 0.33;
    #chat_message{
        margin-left: 10px;
        margin-right: 10px;
        width: 80%;
        height: 40px;
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
        <>
            <ChatBox className="where" ref={messageRef}>
                {
                    messages?.map((message, i) => (
                        <ChatContainer className={`messages__item ${message.chatClass}`} key={'message chat' + userName + i}>
                            <Message text={message.text} userName={message.userName} />
                        </ChatContainer>
                    ))
                }
                <ChatInputContainer>
                    {
                        <div>
                            <input
                                ref={inputRef}
                                id="chat_message"
                                type="text"
                                placeholder="내용을 입력하세요"
                            />
                            <p className="chatbox__send--footer" onClick={sendmessageByClick}>전송</p>
                        </div>
                    }
                </ChatInputContainer>
            </ChatBox>
        </>
    )
}

export default memo(Messages);