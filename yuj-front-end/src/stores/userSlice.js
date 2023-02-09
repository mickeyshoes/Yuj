import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const userSlice = createSlice({
	name:'userSlice',

	initialState:{
		userId: 0,
		username: "김인중",
		nickname: "요가소년",
		token: "yuj1234"
	},

	reducers: {
		changeToken:(state, action) => {
			const newToken = action.payload;
			state.token = newToken;
		}
	},

	extraReducers: {}
});

export default userSlice;

export const { changeToken } = userSlice.actions;
