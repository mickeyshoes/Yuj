import { Hidden } from "@mui/material";
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

const ListMember = ({ listMember, exitMember }) => {
    return (
        <Member>
            <p style={{width:'80px', 'text-overflow': 'ellipsis', overflow:'hidden', whiteSpace:'nowrap'}}>{listMember[0]}</p>
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
            {
                listMember[5] === '강사' ?
                    listMember[1] == '수강생'?
                        <button onClick={() => exitMember(listMember[4])}><span class="material-symbols-outlined"> exit_to_app </span></button>
                    : null
                : null
            }
        </Member>
    )
}

export default ListMember;
