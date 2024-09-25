export enum SearchMode {
	insensitive = 'insensitive',
	default = 'default',
}

export enum TodoStatus {
	PUBLIC = 'public',
	PRIVATE = 'private',
	COMPLETED = 'completed',
}

export type TodoFilters = {
	userId: number;
	isCompleted?: boolean;
	isPublic?: boolean;
	title?: { contains: string; mode: SearchMode };
};
export type IntakeFilters = {
	skip?: number;
	take?: number;
};
