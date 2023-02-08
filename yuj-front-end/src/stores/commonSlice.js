import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//웹 페이지 내에서 공통으로 사용할 정보 저장

//요가 테이블 정보 받아오기
const getYogaInfo = createAsyncThunk("GET_YOGA", async() => {
    //yoga 테이블 정보를 GET 메소드로 가져오는 API
    const response = await axios.get(`http://localhost:5000/api/yoga`);
    //가져온 데이터 리턴
    return response.data;
})

const commonSlice = createSlice({
    name: 'commonSlice',

    initialState: {
        yogaCategory: [
            "Raja",
            "Jnana",
            "Karma",
            "Bhakti",
            "Hahta",
        ]
    },

    reducers: {
        
    },

    extraReducers: {
        [getYogaInfo.fulfilled]: (state, {payload}) => {
            console.log("get yogaInfo", payload);
            
        }
    }
})

export default commonSlice;

export {getYogaInfo};