export type UserResponseDto = {
	id: number;
	email: string;
	name: string | null;
	token?: string;
	isverified: boolean;
	verificationtoken: string;
};

export type UserClientResponseDto = {
	id: number;
	email: string;
	name: string | null;
	token?: string;
};

export type UserResponseTokenDto = {
	token: string;
};
