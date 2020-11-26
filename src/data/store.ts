import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducers from '../pages/Users/UsersSlice';

export const store = configureStore({
	reducer: {
		data: usersReducers,
	},
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
