import React from 'react';
import styled from 'styled-components';
import './OpenVidu.css';
import ListMember from './ListMember' 

const MemberCount = styled.p`
    position: relative !important;
    font-size: 1rem;
    font-weight: bold;
    color: white;
`;

const MemberBox = styled.div`
    position: absolute;
    background-color: rgba(0, 0, 0, 0.33);
    border-radius: 20px;
    width: 500px;
    height: 310px;

    overflow-y: scroll;
    word-break: break-all;
    line-break: normal;
    position: absolute;
    bottom: 60%;
    right:0;
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