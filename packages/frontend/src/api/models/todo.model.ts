import { ITodoType } from '~shared/types/todo/todo.types';

type IStatusChange = {
	complete: () => void;
	public: () => void;
};

class TodoModel {
	id: number;
	title: string;
	text: string;
	isCompleted: boolean;
	isPublic: boolean;
	userId: number;
	changeStatus: IStatusChange;

	constructor(data: ITodoType) {
		this.id = data.id;
		this.title = data.title.toLocaleUpperCase();
		this.text = data.text;
		this.isCompleted = data.isCompleted;
		this.isPublic = data.isPublic;
		this.userId = data.userId;
		this.changeStatus = this.toggleStatus();
	}

	private toggleStatus(): IStatusChange {
		return {
			complete: () => (this.isCompleted = !this.isCompleted),
			public: () => (this.isPublic = !this.isPublic),
		};
	}

	changeDescription(textContent: string): void {
		this.text = textContent;
	}

	changeTitle(textContent: string): void {
		this.title = textContent;
	}
}

const createTodoModel = (todoResponseDto: ITodoType): TodoModel => {
	return new TodoModel(todoResponseDto);
};

export { createTodoModel, type TodoModel };
