import React from "react";
import { useState } from "react";
import styled from "styled-components";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Button } from "@mui/material";

const FileInput = ({initialLabelText, onChangeEvent}) => {

  const [lebelText, setLabelText] = useState(initialLabelText);

  return (
    <>  
      <AppStyle>
        <div className={"btnStart w-full"}>
          <label htmlFor="ex_file" className={"w-full"}>
            <div className={'flex items-center'}>
              <p className="w-28 btn btn-sm btn-accent text-xs text-white" onClick={() => {}}>사진 변경</p>
              <div className={"flex rounded-xl justify-between items-center px-3 h-10 ml-3"}>
                <p className={"text-xs mr-3"}>{lebelText}</p>
              </div>
            </div>
          </label>
        </div>
        <input
          type="file"
          id="ex_file"
          accept="image/jpg, image/png, image/jpeg"
          onChange={(e) => {
            setLabelText(e.target.files[0].name);
            onChangeEvent(e.target.files[0]);
          }}
        />
      </AppStyle>
    </>
  )   
}


const AppStyle = styled.div`
  label {
    display: inline-block;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;
export default FileInput;