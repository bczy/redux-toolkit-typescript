import React from 'react';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import UserWebSite from '../../components/UserWebSite';
import UserEmail from '../../components/UserEmail';
import {
	selectFetchingAlbums,
	selectFetchingTodos,
	selectFetchingUsers,
	selectUsers,
} from './UsersSlice';

const UserTableHead = (): React.ReactElement => (
	<TableHead>
		<TableRow>
			<TableCell>User name</TableCell>
			<TableCell>Email</TableCell>
			<TableCell>Website</TableCell>
			<TableCell>Company name</TableCell>
			<TableCell>Todos count</TableCell>
			<TableCell>Album count</TableCell>
		</TableRow>
	</TableHead>
);

export default function Users(): React.ReactElement {
	const users = useSelector(selectUsers);
	const fetchingUsers = useSelector(selectFetchingUsers);
	const fetchingAlbums = useSelector(selectFetchingAlbums);
	const fetchingTodos = useSelector(selectFetchingTodos);

	return (
		<>
			<Typography variant="h4">User list</Typography>
			<TableContainer component={Paper}>
				<Table aria-label="user list">
					<UserTableHead />
					<TableBody>
						{fetchingUsers ? (
							<TableRow>
								<TableCell colSpan={6}>Loading...</TableCell>
							</TableRow>
						) : (
							users.map((user, i) => (
								<TableRow key={i}>
									<TableCell>
										<Link to={{ pathname: '/user', state: { user } }}>
											{user.username}
										</Link>
									</TableCell>
									<TableCell>
										<UserEmail email={user.email} />
									</TableCell>
									<UserWebSite url={user.website} />
									<TableCell>{user.company.name}</TableCell>
									<TableCell>
										{fetchingTodos ? 'Loading...' : user.nbTodos}
									</TableCell>
									<TableCell>
										{fetchingAlbums ? 'Loading...' : user.albums?.length}
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
