import { UserModel, AlbumModel, ThumbModel, TodoModel } from './models';

export function mergeUsersWithOtherInfo(
	previousUsers: Array<UserModel>,
	actionUsers: Array<UserModel>
): UserModel[] {
	let users = previousUsers ? previousUsers : new Array<UserModel>();
	for (let i = 0; i < actionUsers.length; i++) {
		let previousUser = users.find(
			(previousUser) => previousUser.id === actionUsers[i].id
		);
		users[i] = { ...previousUser, ...actionUsers[i] };
	}
	return users;
}

export function mergeUsersAndTodos(
	users: Array<UserModel>,
	todos: Array<TodoModel>
): UserModel[] {
	let updatedUsersWithTodos = users || new Array<UserModel>();
	for (let i = 0; i < todos.length; i++) {
		let userToUpate = updatedUsersWithTodos.find(
			(user) => user.id === todos[i].userId
		);
		if (!userToUpate) {
			userToUpate = { id: todos[i].userId };
			updatedUsersWithTodos.push(userToUpate);
		}
		userToUpate.nbTodos = (userToUpate.nbTodos || 0) + 1;
	}
	return updatedUsersWithTodos;
}
export function mergeUsersAndAlbums(
	users: Array<UserModel>,
	albums: Array<AlbumModel>
): UserModel[] {
	let updatedUsersWithAlbum = users || new Array<UserModel>();
	for (let i = 0; i < albums.length; i++) {
		let userToUpate = updatedUsersWithAlbum.find(
			(user) => user.id === albums[i].userId
		);
		if (!userToUpate) {
			userToUpate = { id: albums[i].userId };
		}
		if (!userToUpate.albums) {
			userToUpate.albums = new Array<AlbumModel>();
		}
		const { id, title, userId, thumbnails }: AlbumModel = albums[i];
		userToUpate.albums.push({ id, title, userId, thumbnails });
	}
	return updatedUsersWithAlbum;
}
export function addThumbsToAlbums(
	users: Array<UserModel>,
	thumbs: Array<ThumbModel>
) {
	const updatedUsers = [...users];
	for (let i = 0; i < thumbs.length; i++) {
		for (let j = 0; j < updatedUsers.length; j++) {
			let album = updatedUsers[j].albums?.find(
				(album) => album.id === thumbs[i].albumId
			);
			if (album && !album.thumbnails) {
				album.thumbnails = new Array<ThumbModel>();
			}
			album?.thumbnails.push(thumbs[i]);
		}
	}
	return users;
}
