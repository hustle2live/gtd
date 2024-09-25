import { IUserResponseDto } from '~shared/types/user/user.types';

class UserModel {
	id: number;
	email: string;
	name: string;
	token: string;

	constructor({ id, email, name = '', token = '' }: IUserResponseDto) {
		this.id = id;
		this.email = email;
		this.name = name;
		this.token = token;
	}

	showToken(): { token: string } {
		return { token: this.token };
	}
}

const createUserModel = (userFromServer: IUserResponseDto): UserModel => {
	return new UserModel(userFromServer);
};

export { createUserModel, type UserModel };
