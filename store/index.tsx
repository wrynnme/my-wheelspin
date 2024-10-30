import { combineReducers, configureStore } from "@reduxjs/toolkit";
import roulette from "./roulette";

const rootReducer = combineReducers({
	roulette,
});

export default configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type IRootState = ReturnType<typeof rootReducer>;
