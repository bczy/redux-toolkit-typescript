export class Company {
	public name: string = '';
}
export class TodoModel {
	constructor(public userId: number) {}
}
export class AlbumModel {
	public thumbnails: Array<ThumbModel>;
	constructor(public id: number, public title: string, public userId: number) {
		this.thumbnails = new Array<ThumbModel>();
	}
}
export class ThumbModel {
	constructor(
		public albumId: number,
		public thumbnailUrl: string,
		public title: string
	) {}
}

export default class UserModel {
	public username: string = '';
	public email: string = '';
	public website: string = '';
	public company: Company = new Company();
	public nbTodos: number = 0;
	public albums: Array<AlbumModel> = new Array<AlbumModel>();
	public name: string = '';
	constructor(public id: number) {}
}
