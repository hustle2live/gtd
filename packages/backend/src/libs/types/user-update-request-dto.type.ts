export type UserUpdateRequestDto = {
	email?: string;
	name?: string | null;
	password?: string;
	isverified?: boolean;
	verificationtoken?: string;
};
