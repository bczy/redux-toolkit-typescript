import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {
	fetchAlbums,
	fetchUsers,
	fetchTodos,
	fetchThumbs,
} from './pages/Users/UsersSlice';

import Users from './pages/Users/Users';
import Album from './pages/Album/Album';
import User from './pages/User/User';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchUsers());
		dispatch(fetchAlbums());
		dispatch(fetchTodos());
		dispatch(fetchThumbs());
	}, [dispatch]);

	return (
		<Router>
			<Switch>
				<Route path="/" exact component={Users} />
				<Route path="/album" component={Album} />
				<Route path="/user" component={User} />
			</Switch>
		</Router>
	);
}

export default App;
