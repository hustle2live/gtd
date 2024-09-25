export type UserCreateRequestDto = {
	name: string | null;
	email: string;
	password: string;
	verificationtoken: string;
};

export type UserVerificationRequestDto = {
	email: string;
	token: string;
	password?: string;
};
