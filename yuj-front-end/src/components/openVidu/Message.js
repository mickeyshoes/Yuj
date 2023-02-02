/* eslint-disable react/self-closing-comp */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
    text-align: left;
    width: 316px;
    color: white;
`;

const Username = styled.p`
    /* color: #42387a; */
    font-size: 0.8rem;
    font-weight: 600;
    padding: 5px 0 10px 0;
`;

const Text = styled.p`
    font-size: 1rem;
`;


const Message = ({ text = 'text not set', userName = 'user Name not set' }) => {
    console.log(text, userName);
    return (
        <MessageContainer>
            <Username>{userName}</Username>
            <Text>{text}</Text>
        </MessageContainer>
    );
}

export default Message;
