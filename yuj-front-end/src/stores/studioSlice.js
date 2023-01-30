/**
 * 1. 필요한 메서드 import 하기
 */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';



/**
 * 2. Axios 함수 만들기(API를 호출하는 함수)
 */
const getStudio = createAsyncThunk("GET_STUDIO", async(studioId) => {
	const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${studioId}`);
	return response.data;
})
const createStudio = createAsyncThunk("CREATE_STUDIO", async(studio) => {
	const studioForm = {
		'userId': studio.teacherId,
		'title': studio.studioName,
		'body': studio.studioDesc
	}

	console.log(studioForm);

	const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`,JSON.stringify(studioForm),{
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		}
	});
	return response.data;
})




/**
 * 3. 사용할 State를 정의하는 Slice 만들기
 */
const studioSlice = createSlice({
	name:'studioSlice',

	// initialState => State의 초기값
	initialState:{
		teacherId: 0,
		studioName: "초기값",
		studioDesc: "초기값",
	},

	// reducers => State를 바꿀 수 있는 모든 함수(= action) 정의
	reducers: {
		changeStudioName:(state, action) => {
			state.studioName = action.payload;
		},
		changeStudioDesc:(state, action) => {
			state.studioDesc = action.payload;
		},
	},

	// extraReducers => Axios 함수의 상태(Success, Failed, Pending)에 따른 동작 정의
	extraReducers: {
		[getStudio.fulfilled]: (state, {payload}) => {
			console.log("get Studio", payload);
			state.studioName = payload.title;
			state.studioDesc = payload.body;
		},
		[createStudio.fulfilled]: (state, {payload}) => {
			console.log("create Studio", payload);
			alert("Studio created!");
		}
	}
});



/**
 * 4. 만든 Slice, action을 다른 곳에서 사용할 수 있도록 export
 */

// Slice는 default로 export 하기
export default studioSlice;

// 일반 action export 하기
export const { changeStudioName, changeStudioDesc } = studioSlice.actions;

// Axios 비동기 action export 하기
export { getStudio, createStudio };