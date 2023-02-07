import React from "react";
import { useState } from "react";
import styled from "styled-components";
import UploadFileIcon from '@mui/icons-material/UploadFile';

const FileInput = ({initialLabelText, onChangeEvent}) => {

  const [lebelText, setLabelText] = useState(initialLabelText);

  return (
    <>  
      <AppStyle>
        <div className={"btnStart w-full"}>
          <label htmlFor="ex_file" >
            <div className={"flex rounded-xl justify-between items-center px-3 border h-10"}>
                <p className={"text-xs mr-3"}>{lebelText}</p>
                <UploadFileIcon className={"text-default"} />
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
  margin: 0 8px 0 8px;
  img {
    max-width: 325px;
  }
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