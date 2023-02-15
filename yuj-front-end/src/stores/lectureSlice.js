import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 특정 강의의 정보를 가져오는 함수
const getLecture = createAsyncThunk("GET_LECTURE", async(lectureId) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/lectures/${lectureId}`);
    return response.data;
})

// 특정 강의의 스케줄을 가져오는 함수
const getLectureSchedule = createAsyncThunk("GET_LECTURE_SCHDULE", async(lectureId) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/lectures/lectureSchedule/${lectureId}`);
	console.log("GET_LECTURE_SCHEDULE_LIST: ",response);
    return response.data;
})

const searchLectures = createAsyncThunk("SEARCH_LECTURES", async(keyword) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/lectures?search=${keyword}`);
    return response.data;
})

const getSelectedLectureList = createAsyncThunk("GET_SELECTED_LECTURE_LIST", async({keyword, yogaId}) => {
	const response = await axios.get(`${process.env.REACT_APP_API_URL}/lectures/yoga/${yogaId}?search=${keyword}`);
    console.log("GET_SELECTED_LECTURE_LIST: ", response);

	return response.data;
})

const updateLectureActive = createAsyncThunk("UPDATE_LECTURE_ACTIVE", async({lectureId, active, userId}) => {
    const data = {
        active,
        userId
    }

    const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/lectures/${lectureId}/updateActive`, 
        JSON.stringify(data), 
        {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
    );
    console.log("UPDATE_LECTURE_ACTIVE: ", response);

    return response.data;
})

const registUserLectureSchedule = createAsyncThunk("REGIST_USER_LECTURE_SCHEDULE", async({lectureId, userId}) => {
    const data = {
        lectureId,
        userId
    }

    const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/lectures/userLectureSchedule`, 
        JSON.stringify(data), 
        {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
    );
    console.log("UPDATE_LECTURE_ACTIVE: ", response);

    return response.data;
})

const lectureSlice = createSlice({
    name: 'lectureSlice',

    initialState: {
        thumnail: './assets/Sample.jpg',
        lectureSchedule: [],
        lectures: [],
        lecturesSearched:[],
    },

    reducers: {
    },

    extraReducers: {
        [getLecture.fulfilled]: (state, {payload}) => {
            console.log("get lecture", payload);
            state.thumnail = '/assets/Sample.jpg';
            state.currLecture = payload;
        },
        [getLectureSchedule.fulfilled]: (state, {payload}) => {
            state.lectureSchedule = payload;
        },
        [searchLectures.fulfilled]: (state, {payload}) => {
            console.log("search lectures", payload);
            state.lecturesSearched = payload;
        },
        [getSelectedLectureList.fulfilled]: (state, {payload}) => { 
            state.lecturesSearched = payload;
        },
        [updateLectureActive.fulfilled]: (state, {payload}) => { 
            console.log("update Lecture active success! : ", payload.active);
        },
        [registUserLectureSchedule.fulfilled]: (state, {payload}) => { 
            console.log("regist userLectureSchedule success! : ", payload.active);
        }
    }
})

export default lectureSlice;

export {getLecture, getLectureSchedule, registUserLectureSchedule, searchLectures, getSelectedLectureList, updateLectureActive};
