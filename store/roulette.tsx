import authConfig from "@/configs/auth";
import HttpClient from "@/services/http-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk(
	"appRoulette/fetchData",
	async (params) => {
		const response = await HttpClient.get(`/list`, {
			params,
			headers: {
				Authorization: `Bearer ${window.localStorage.getItem(
					authConfig.storageTokenKeyName
				)}`,
			},
		});

		return response.data.data;
	}
);

export const appRouletteSlice = createSlice({
	name: "appRoulette",
	initialState: {
		data: [],
		total: 0,
		params: {},
	} as any,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchData.fulfilled, (state, action) => {
			state.data = action.payload;
			state.total = action.payload?.length || 0;
			state.params = action.meta.arg;
		});
	},
});

export default appRouletteSlice.reducer;
