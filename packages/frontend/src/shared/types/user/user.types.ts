export type IUserResponseDto = {
	id?: number;
	name?: string;
	email: string;
	token?: string;
};

export type IUserTokenDto = {
	token: string;
};

export type IUserRequestDto = {
	id?: string;
	name?: string;
	email: string;
};

export type IUserUpdateDto = {
	name?: string;
	email?: string;
};

export type IUserRegisterDto = {
	email: string;
	password: string;
};

export type IUserFormRegister = {
	email: string;
	password: string;
	passwordConfirm: string;
};

export type IResetUserData = {
	email: string;
	token: string;
	password?: string | null;
};
