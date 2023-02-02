import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axios from 'axios';


const studioSlice = createSlice({
	name:'studioSlice',

	initialState:{
		studioDetail: {
			studio_id: 0,
			user_id: 0,
			banner_image: './assets/infoBackground.png',
			description: 
			`※ 구독자분들과 함께 요가수련하는 요가 안내자입니다.
			※ 비즈니스 문의 | yogaboyofficial@gmail.com
			※ 하루10분, 요가로 찾은 내 몸의 선 | 클래스101 | https://101creator.page.link/eW3k
			※ 건강한 다이어트, 하루 30분 요가 챌린지 | 클래스유 | https://me2.do/GRAbFITs`,
			nickname: '요가소년',
			email: 'yogachild@gmail.com',
		},
		studioList: [],
	},

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

	extraReducers: {}
});



/**
 * 4. 만든 Slice, action을 다른 곳에서 사용할 수 있도록 export
 */

// Slice는 default로 export 하기
export default studioSlice;

// 일반 action export 하기
export const { changeStudioName, changeStudioDesc, addStudioToList } = studioSlice.actions;