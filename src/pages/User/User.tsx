import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import FolderIcon from '@material-ui/icons/Folder';

import { Link } from 'react-router-dom';

import UserEmail from '../../components/UserEmail';
import { UserModel } from '../../data/models';
import React from 'react';

function User({ location }: any): React.ReactElement {
	const user = location.state.user as UserModel;
	return (
		<Paper>
			<Typography variant="h4">User details</Typography>
			<br />
			{user && (
				<>
					<Typography variant="body1">
						<b>Name:</b> {user.name}
					</Typography>
					<Typography variant="body1">
						<b>User name:</b> {user.username}
					</Typography>

					<Typography variant="body1">
						<UserEmail email={user.email} showEmailLabel={true} />
					</Typography>
					<Typography>
						<b>Album list</b>
					</Typography>
					<List>
						{user?.albums?.map((album, i) => (
							<Link key={i} to={{ pathname: 'album', state: album }}>
								<ListItem button>
									<ListItemIcon>
										<FolderIcon />
									</ListItemIcon>
									<ListItemText primary={album.title} />
								</ListItem>
							</Link>
						))}
					</List>
				</>
			)}
			<Button variant="contained" style={{ margin: '1em' }}>
				<Link to="/">Back to user list</Link>
			</Button>
		</Paper>
	);
}
export default User;
