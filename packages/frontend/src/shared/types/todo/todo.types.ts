export type ITodoType = {
	id: number;
	title: string;
	text: string;
	isCompleted: boolean;
	isPublic: boolean;
	userId: number;
};

export type ITodoCreateRequestDto = {
	title: string;
	text?: string;
	isCompleted?: boolean;
	isPublic?: boolean;
};

export type ITodoUpdateRequestDto = {
	title?: string;
	text?: string;
	isCompleted?: boolean;
	isPublic?: boolean;
};
