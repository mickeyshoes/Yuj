import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const getStudioDetail = createAsyncThunk("GET_STUDIO_DETAIL", async(userId) => {

	const response = await axios.get(`https://i8a504.p.ssafy.io/api/studio/${userId}`);
	console.log("GET_STUDIO_DETAIL: ",response);

	return response.data;
})


const getStudioLectureList = createAsyncThunk("GET_STUDIO_LECTURE_LIST", async(userId) => {

	const response = await axios.get(`https://i8a504.p.ssafy.io/api/studio/${userId}/lectures`);
	console.log("GET_STUDIO_LECTURE_LIST: ",response);

	return response.data;
})

const getStudioSelectedLectureList = createAsyncThunk("GET_STUDIO_SELECTED_LECTURE_LIST", async({userId, yogaId}) => {
	const response = await axios.get(`https://i8a504.p.ssafy.io/api/studio/${userId}/lectures/${yogaId}`);
	console.log("GET_STUDIO_SELECTED_LECTURE_LIST: ",response);

	return response.data;
})

const getStudioLiveLecture = createAsyncThunk("GET_STUDIO_LIVE_LECTURE", async(userId) => {

	const response = await axios.get(`https://i8a504.p.ssafy.io/api/studio/${userId}/checkLive`);
	console.log("GET_STUDIO_LIVE_LECTURE: ",response);

	return response.data;
})

const searchTeachers = createAsyncThunk("SEARCH_TEACHERS", async(keyword) => {

	const response = await axios.get(`https://i8a504.p.ssafy.io/api/users?search=${keyword}`);
	console.log("SEARCH_TEACHERS", response);

	return response.data;
})


const studioSlice = createSlice({
	name:'studioSlice',

	initialState:{
		studioDetail: {
			studioId: 0,
			bannerImage: './assets/infoBackground.png',
			description: 
			`※ 구독자분들과 함께 요가수련하는 요가 안내자입니다.※ 비즈니스 문의 | yogaboyofficial@gmail.com※ 하루10분, 요가로 찾은 내 몸의 선 | 클래스101 | https://101creator.page.link/eW3k※ 건강한 다이어트, 하루 30분 요가 챌린지 | 클래스유 | https://me2.do/GRAbFITs`,
			userId: 0,
			username: "edward1234",
			nickname: "요가소년",
			email: "edward777@naver.com",
			profileImagePath: "./profile1.jpg"
		},
		studioLectureList: [],
		studioLiveLecture: {},
		studioLectureDetailItem: {},
		teachersSearched: [],
	},

	reducers: {
		changeStudioDetail:(state, action) => {
			const newStudioDetail = action.payload;
			state.studioDetail = newStudioDetail;
		},
		changeStudioLectureList:(state, action) => {
			const newStudioLectureList = action.payload;
			state.studioLectureList = newStudioLectureList;
		},
		addStudioLectureList:(state, action) => {
			const newStudioLecture = action.payload;
			state.studioLectureList = [...state.studioLectureList, newStudioLecture];
		},
		changeSelectedCategory:(state, action) => {
			const newSelectedCategery = action.payload;
			state.selectedCategory = newSelectedCategery;
		},
		changeStudioLectureDetailItem:(state, action) => {
			const newItem = action.payload;
			state.studioLectureDetailItem = newItem;
		}
	},

	extraReducers: {
		[getStudioDetail.fulfilled]: (state, {payload}) => {
			state.studioDetail = payload;
		},
		[getStudioLectureList.fulfilled]: (state, {payload}) => {
			state.studioLectureList = payload;
		},
		[getStudioLiveLecture.fulfilled]: (state, {payload}) => {
			state.studioLiveLecture = payload;
		},
		[getStudioSelectedLectureList.fulfilled]: (state, {payload}) => {
			state.studioLectureList = payload;
		},
		[searchTeachers.fulfilled]: (state, {payload}) => {
			state.teachersSearched = payload;
		},
	}
});


export default studioSlice;

export const { changeStudioDetail, changeStudioLectureList, addStudioLectureList, changeSelectedCategory, changeStudioLectureDetailItem } = studioSlice.actions;

export { getStudioDetail, getStudioLectureList, getStudioLiveLecture, getStudioSelectedLectureList, searchTeachers };
