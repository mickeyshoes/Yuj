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
                listMember[2] === true ?
                <span class="material-symbols-outlined">videocam</span> : <span class="material-symbols-outlined">  videocam_off</span>
            }
            {
                listMember[3] === true ?
                <span class="material-symbols-outlined">  mic</span> : <span class="material-symbols-outlined">  mic_off</span>
            }
            {
                listMember[1] === '강사' ?
                <span class="material-symbols-outlined">  how_to_reg</span> : <span class="material-symbols-outlined">  person</span>
            }
        </Member>
    )
}

export default ListMember;