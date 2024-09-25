export type TodoUpdateRequestDto = {
	id: number;
	title?: string;
	text?: string;
	isCompleted?: boolean;
	isPublic?: boolean;
};
