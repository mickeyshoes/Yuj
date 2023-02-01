import React from 'react';
import styled from 'styled-components';

const Member = styled.p`
    position: relative !important;
    display: flex;
    font-size: 1rem;
    span{
        padding-left: 30px;
    }
`;

const ListMember = ({ listMember }) => {
    return (
        <Member>
            <>{listMember[0]}</>
            {
                listMember[1] === true ?
                <span class="material-symbols-outlined">videocam</span> : <span class="material-symbols-outlined">  videocam_off</span>
            }
            {
                listMember[2] === true ?
                <span class="material-symbols-outlined">  mic</span> : <span class="material-symbols-outlined">  mic_off</span>
            }
        </Member>
    )
}

export default ListMember;