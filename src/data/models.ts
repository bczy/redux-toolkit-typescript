export interface Company {
	name: string;
}
export interface TodoModel {
	userId: number;
}
export interface AlbumModel {
	thumbnails: Array<ThumbModel>;
	id: number;
	title: string;
	userId: number;
}
export interface ThumbModel {
	albumId: number;
	thumbnailUrl: string;
	title: string;
}

export interface UserModel {
	id: number;
	username?: string;
	email?: string;
	website?: string;
	company?: Company;
	nbTodos?: number;
	albums?: Array<AlbumModel>;
	name?: string;
}
