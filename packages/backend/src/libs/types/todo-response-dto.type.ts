export type TodoGetResponseDto = {
	id: number;
	title: string;
	text: string;
	isCompleted: boolean;
	isPublic: boolean;
	userId?: number;
};
