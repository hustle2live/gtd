import { client, PrismaClient } from '@/client';
import { TodoCreateRequestDto } from '@/libs/types/todo-create-request-dto.type';
import { IntakeFilters, TodoFilters } from '@/libs/types/todo-filters.type';
import { TodoGetResponseDto } from '@/libs/types/todo-response-dto.type';
import { TodoUpdateRequestDto } from '@/libs/types/todo-update-request-dto.type';
import { TodoType } from '@/libs/types/todos.type';

class TodoService {
	private db: PrismaClient;

	constructor(service: PrismaClient) {
		this.db = service;
	}

	async findAllPublic(): Promise<TodoGetResponseDto[] | []> {
		return await this.db.todo.findMany({
			where: { isPublic: true },
		});
	}

	async findAllByUserId(
		user_id: number,
	): Promise<TodoGetResponseDto[] | null> {
		const userTodos = await this.db.todo.findMany({
			where: { userId: user_id },
		});
		return userTodos;
	}

	async countAll(filters: TodoFilters): Promise<number> {
		return await this.db.todo.count({
			where: { ...filters },
		});
	}

	async findAllFiltered(
		filters: TodoFilters,
		intake: IntakeFilters,
	): Promise<TodoGetResponseDto[] | null> {
		const userTodos = await this.db.todo.findMany({
			where: {
				...filters,
			},
			orderBy: { title: 'asc' },
			...intake,
		});
		return userTodos;
	}

	async findOne(todo_id: number): Promise<TodoType | null> {
		const userTodo = await this.db.todo.findFirst({
			where: { id: todo_id },
		});
		return userTodo ?? null;
	}

	async search(todo_id: number): Promise<boolean> {
		const todo = await this.db.todo.findUnique({
			where: { id: todo_id },
		});
		return Boolean(todo);
	}

	async create(
		user_id: number,
		todo_body: TodoCreateRequestDto,
	): Promise<TodoType | null> {
		const newTodo = await this.db.todo.create({
			data: { ...todo_body, userId: user_id },
		});
		return newTodo ?? null;
	}

	async update(
		todo_id: number,
		todo_body: TodoUpdateRequestDto,
	): Promise<TodoType | null> {
		const updatedTodo = await this.db.todo.update({
			where: { id: todo_id },
			data: {
				...todo_body,
			},
		});
		return updatedTodo ?? null;
	}

	async delete(todo_id: number): Promise<TodoType | null> {
		const deleted = await this.db.todo.delete({ where: { id: todo_id } });
		return deleted ?? null;
	}
}

const todoService = new TodoService(client);

export { type TodoService, todoService as todoServiceDatabase };
