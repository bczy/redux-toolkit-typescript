import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../data/store';
import {
	UserModel,
	AlbumModel,
	ThumbModel,
	TodoModel,
} from '../../data/models';
import {
	addThumbsToAlbums,
	mergeUsersAndAlbums,
	mergeUsersAndTodos,
	mergeUsersWithOtherInfo,
} from '../../data/utils';

const API_URL = 'https://jsonplaceholder.typicode.com';

interface UserState {
	fetchingUsers: boolean;
	fetchingTodos: boolean;
	fetchingAlbums: boolean;
	fetchingThumbs: boolean;
	users: Array<UserModel>;
}

const initialState: UserState = {
	fetchingUsers: false,
	fetchingTodos: false,
	fetchingAlbums: false,
	fetchingThumbs: false,
	users: [] as Array<UserModel>,
};

export const usersSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		requestUsers: (state) => {
			state.fetchingUsers = true;
		},
		requestTodos: (state) => {
			state.fetchingTodos = true;
		},
		requestAlbums: (state) => {
			state.fetchingAlbums = true;
		},
		requestThumbs: (state) => {
			state.fetchingThumbs = true;
		},
		receiveUsers: (state, action: PayloadAction<Array<UserModel>>) => {
			state.fetchingUsers = false;
			state.users = mergeUsersWithOtherInfo(state.users, action.payload);
		},
		receiveTodos: (state, action: PayloadAction<Array<TodoModel>>) => {
			state.fetchingTodos = false;
			state.users = mergeUsersAndTodos(state.users, action.payload);
		},
		receiveAlbums: (state, action: PayloadAction<Array<AlbumModel>>) => {
			state.fetchingAlbums = false;
			state.users = mergeUsersAndAlbums(state.users, action.payload);
		},
		receiveThumbs: (state, action: PayloadAction<Array<ThumbModel>>) => {
			state.fetchingThumbs = false;
			state.users = addThumbsToAlbums(state.users, action.payload);
		},
	},
});

export const {
	requestUsers,
	requestTodos,
	requestAlbums,
	requestThumbs,
	receiveAlbums,
	receiveThumbs,
	receiveTodos,
	receiveUsers,
} = usersSlice.actions;

// Functions below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchUsers = (): AppThunk => (dispatch) => {
	dispatch(requestUsers());
	fetch(`${API_URL}/users`)
		.then(async (response) => {
			const jsonResponse = await response.json();
			dispatch(receiveUsers(jsonResponse));
		})
		.catch((e) => {
			//TODO Handle network error
			console.log(e);
		});
};

export const fetchTodos = (): AppThunk => (dispatch) => {
	dispatch(requestTodos());
	fetch(`${API_URL}/todos/?completed=false`)
		.then(async (response) => {
			const jsonResponse = await response.json();
			dispatch(receiveTodos(jsonResponse));
		})
		.catch((e) => {
			//TODO Handle network error
			console.log(e);
		});
};
export const fetchAlbums = (): AppThunk => (dispatch) => {
	dispatch(requestAlbums());
	fetch(`${API_URL}/albums`)
		.then(async (response) => {
			const jsonResponse = await response.json();
			dispatch(receiveAlbums(jsonResponse));
		})
		.catch((e) => {
			//TODO Handle network error
			console.log(e);
		});
};

export const fetchThumbs = (): AppThunk => (dispatch) => {
	dispatch(requestThumbs());
	fetch(`${API_URL}/photos`)
		.then(async (response) => {
			const jsonResponse = await response.json();
			dispatch(receiveThumbs(jsonResponse));
		})
		.catch((e) => {
			//TODO Handle network error
			console.log(e);
		});
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUsers = (state: RootState) => state.data.users;
export const selectFetchingUsers = (state: RootState) =>
	state.data.fetchingUsers;
export const selectFetchingAlbums = (state: RootState) =>
	state.data.fetchingAlbums;
export const selectFetchingTodos = (state: RootState) =>
	state.data.fetchingTodos;
export const selectFetchingThumbs = (state: RootState) =>
	state.data.fetchingThumbs;

export default usersSlice.reducer;
