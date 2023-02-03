import React from 'react';
import styled from 'styled-components';
import './OpenVidu.css';
import ListMember from './ListMember' 

const MemberCount = styled.p`
    position: relative !important;
    width: 175px;
    height: 27px;

    font-family: 'Montserrat';
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    
    color: white;
`;

const MemberBox = styled.div`
    position: absolute;
    width: 320px;
    height: 320px;

    z-index: 99;
    background-color: rgba(0, 0, 0, 0.33);
    border-radius: 20px;

    margin: 10px;
    overflow-y: scroll;
    word-break: break-all;
    line-break: normal;
    text-align: center;
    bottom: 60%;
    right:0;

    color: white;
`;
const ListMembers = ({ listMembers }) => {
    return (
        <>
            <MemberBox>
                <MemberCount>참가자({ listMembers.length})</MemberCount>
                {
                    listMembers?.map((listMember, i) => (
                        <div key={'list member' + listMember[0] + i}>
                            <ListMember listMember={ listMember } />
                        </div>
                    ))
                }
            </MemberBox>
        </>
    )
}

export default ListMembers;