import { Response, Request } from 'express';
import {
	todoServiceDatabase,
	type TodoService,
} from '../services/todo.service';
import { HttpStatusCodes as HttpCode } from '@/libs/constants/status-code';

import { TodoType } from '@/libs/types/todos.type';
import { ErrorMessage as Message } from '@/libs/constants/error-message';
import {
	IntakeFilters,
	SearchMode,
	TodoFilters,
	TodoStatus,
} from '@/libs/types/todo-filters.type';

export class TodoController {
	private todoService: TodoService;

	constructor(service: TodoService) {
		this.todoService = service;
	}

	async getPublic(req: Request, res: Response): Promise<void> {
		const todos = await this.todoService.findAllPublic();
		res.status(HttpCode.OK).send(todos);
	}

	async getUserTodos(req: Request, res: Response): Promise<void> {
		const { userId, search, status, page, perPage } = req.query;

		const filters: TodoFilters = { userId: Number(userId) };
		const intake: IntakeFilters = {};

		if (search) {
			filters.title = {
				contains: search as string,
				mode: SearchMode.insensitive,
			};
		}

		if (status) {
			switch (status as TodoStatus) {
				case TodoStatus.COMPLETED:
					filters.isCompleted = true;
					break;
				case TodoStatus.PRIVATE:
					filters.isPublic = false;
					break;
				case TodoStatus.PUBLIC:
					filters.isPublic = true;
					break;
			}
		}

		const totalCount = await this.todoService.countAll(filters);

		if (totalCount === 0) {
			res.status(HttpCode.OK).send({
				todos: [],
				totalCount: totalCount,
			});
			return;
		}

		if (page && perPage) {
			const onPageItems = Number(perPage);
			const toSkipItems = (Number(page) - 1) * onPageItems;
			intake.skip = toSkipItems;
			intake.take = onPageItems;
		}

		const todos = await this.todoService.findAllFiltered(filters, intake);

		if (todos === null) {
			res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
				message: Message.UNKNOWN,
			});
		}

		res.status(HttpCode.OK).send({ todos: todos, totalCount: totalCount });
	}

	async getById(req: Request, res: Response): Promise<void> {
		const todoId = Number(req.params?.id);
		const todo = await this.todoService.findOne(todoId);
		if (!todo) {
			res.status(HttpCode.NOT_FOUND).json({
				message: Message.NOT_FOUND,
			});
		}
		res.status(HttpCode.OK).send(todo);
	}

	async createTodo(req: Request, res: Response): Promise<void> {
		const todoBody = req.body;
		const userId = Number(req.query.userId);

		const newTodo: TodoType | null = await this.todoService.create(
			userId,
			todoBody,
		);

		if (!newTodo) {
			res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
				message: 'Can not create todo',
			});
		}

		res.status(HttpCode.OK).send(newTodo);
	}

	async updateTodo(req: Request, res: Response): Promise<void> {
		const userId = Number(req.query.userId);
		const todoId = Number(req.params.id);

		const todo = await this.todoService.findOne(todoId);

		if (todo?.userId !== userId) {
			res.statusCode = HttpCode.BAD_REQUEST;
			throw Error('Invalid UserId to edit Todo');
		}

		const todoBody = req.body;
		const updateTodo = await this.todoService.update(todoId, todoBody);
		if (!updateTodo) {
			res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
				message: 'Can not update todo',
			});
		}
		res.status(HttpCode.OK).send(updateTodo);
	}

	async deleteTodo(req: Request, res: Response): Promise<void> {
		const userId = Number(req.query.userId);
		const todoId = Number(req.params.id);

		const todo = await this.todoService.findOne(todoId);

		if (todo?.userId !== userId) {
			res.statusCode = HttpCode.BAD_REQUEST;
			throw Error('Invalid UserId to edit Todo');
		}

		const deleteTask = await this.todoService.delete(todoId);
		if (!deleteTask) {
			res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
				message: 'Can not delete todo',
			});
		}

		res.status(HttpCode.OK).send(deleteTask);
	}
}

const todoController = new TodoController(todoServiceDatabase);

export default todoController;
