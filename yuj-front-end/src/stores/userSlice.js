import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { Buffer } from 'buffer'
import axios from 'axios';

const loginRequest = createAsyncThunk("LOGIN", async(loginForm) => {

	const response = await axios.post(
		// `https://i8a504.p.ssafy.io/api/login`,
		`${process.env.REACT_APP_API_URL}/login`,

		JSON.stringify(loginForm),
		{
			headers: {
				'Content-type': 'application/json',
				'Accept': '*/*'
			}
		}
	);

	console.log("LOGIN response: ",response);

	return {tokenInfo: response.data.data, id: loginForm.id};
})

const getUserInfo = createAsyncThunk("GET_USER_INFO", async({accessToken, userId}) => {
	const response = await axios.get(
		// `${process.env.REACT_APP_API_URL}/users/${userId}`
		`${process.env.REACT_APP_API_URL}/users/${userId}`
		,
		{
			headers: {
				'X-AUTH-TOKEN': accessToken,
				'Accept': '*/*'
			}
		}
	)

	console.log("GET_USER_INFO response: ",response);

	return response.data.data;
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
		userId: -1,
		userInfo: {
			// id: "",
			// name: "",
			// nickname: "",
			// phone: "",
			// email: "",
			// birthDate: "",
			// gender: "",
			// profileImage: "",
			// isTeacher: "",
		}
	},

	reducers: {
		clearUserState:(state, action) => {
			state.tokenInfo = {};
			state.userId = -1;
			state.userInfo = {};
		}
	},

	extraReducers: {
		[loginRequest.fulfilled]: (state, {payload}) => {
			const tokenInfo = payload.tokenInfo;
			const id = payload.id;
			state.tokenInfo = tokenInfo;
			state.userId = decodeJwtToken(tokenInfo.accessToken);
		},
		[getUserInfo.fulfilled]: (state, {payload}) => {
			console.log(payload);
			state.userInfo = payload;
		},
	}
});

export default userSlice;

export const { clearUserState } = userSlice.actions;

export { loginRequest, getUserInfo };
