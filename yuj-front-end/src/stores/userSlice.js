import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { useNavigate } from 'react-router';
import axios from 'axios';

const loginRequest = createAsyncThunk("LOGIN", async(userId, password) => {
	const loginForm = {
		id: userId,
		password: password
	}

	const response = await axios.post(`https://i8a504.p.ssafy.io/api/login`,JSON.stringify(loginForm));
	console.log("LOGIN: ",response);

	return response.data;
})

const decodeJwtToken = (token) => {
	const base64Payload = token.split('.')[1];
	const payload = Buffer.from(base64Payload, 'base64'); 
	const result = JSON.parse(payload.toString());
	console.log(result);
	return result.sub;
}

const userSlice = createSlice({
	name:'userSlice',

	initialState:{
		tokenInfo: {
			grantType: "",
			accessToken: "",
			refreshToken: "",
			accessTokenExpireDate: 0
		},
		userId: ''
	},

	reducers: {
		clearUserState:(state, action) => {
			state.tokenInfo = {};
			state.userInfo = '';
		}
	},

	extraReducers: {
		[loginRequest.fulfilled]: (state, {payload}) => {
			const tokenInfo = payload.data;
			state.tokenInfo = tokenInfo;
			state.userId = decodeJwtToken(tokenInfo.accessToken);
			useNavigate('/');
		},
	}
});

export default userSlice;

export const { clearUserState } = userSlice.actions;

export { loginRequest };
