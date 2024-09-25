export type UserType = {
	id: number;
	email: string;
	name: string | null;
	password: string;
	isverified?: boolean;
	verificationtoken?: string;
};
