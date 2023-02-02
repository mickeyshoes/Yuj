/**
 * 1. 필요한 메서드 import 하기
 */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';



/**
 * 2. Axios 함수 만들기(API를 호출하는 함수)
 */

// 특정 스튜디오의 정보를 가져오는 함수
const getStudio = createAsyncThunk("GET_STUDIO", async(studioId) => {

	// Studio의 정보를 GET 메소드로 가져오는 api 호출
	const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${studioId}`);

	// 가져온 Studio 데이터를 리턴
	return response.data;
})

// 새로운 스튜디오를 등록하는 함수
const createStudio = createAsyncThunk("CREATE_STUDIO", async(studio) => {

	// post로 넘겨줄 스튜디오 form 객체 만들기
	const studioForm = {
		'userId': studio.teacherId,
		'title': studio.studioName,
		'body': studio.studioDesc
	}
	console.log(studioForm);

	// 만들어준 스튜디오 form 객체를 post로 보내는 api 호출
	const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`,JSON.stringify(studioForm),{
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		}
	});

	// 저장 성공 여부 데이터를 리턴
	return response.data;
})




/**
 * 3. 사용할 State를 정의하는 Slice 만들기
 */
const studioSampleSlice = createSlice({
	name:'studioSampleSlice',

	// initialState => State의 초기값
	initialState:{
		teacherId: 0,
		studioName: "초기값",
		studioDesc: "초기값",
		studioList: [],
	},

	// reducers => State를 바꿀 수 있는 모든 함수(= action) 정의
	reducers: {
		changeStudioName:(state, action) => {
			const newStudioName = action.payload;
			state.studioName = newStudioName;
		},
		changeStudioDesc:(state, action) => {
			const newStudioDesc = action.payload;
			state.studioDesc = newStudioDesc;
		},
		addStudioToList:(state, action) => {
			const newStudio = action.payload;
			state.studioList = [...state.studioList, newStudio];
		}
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
export default studioSampleSlice;

// 일반 action export 하기
export const { changeStudioName, changeStudioDesc, addStudioToList } = studioSampleSlice.actions;

// Axios 비동기 action export 하기
export { getStudio, createStudio };