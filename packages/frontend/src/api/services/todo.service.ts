import {
	ITodoCreateRequestDto,
	ITodoType,
	ITodoUpdateRequestDto,
} from '~shared/types/todo/todo.types';

import HttpService from './http.service';
import { FilterType } from '~shared/types/filters/filters-type';
import { API_KEYS, API_PARAM_KEYS } from '~shared/keys';
import {
	addTodoCallback,
	deleteTodoCallback,
	updateStoreCallback,
	updateTodoCallback,
} from '~store/update-store.actions';

type TDataResponse = {
	data: { todos: ITodoType[]; totalCount: number };
};

class TodoService extends HttpService {
	filters: string;
	constructor() {
		super();
		this.filters = '';
	}

	addFilterParams({ search, status, page, perPage }: FilterType): string {
		try {
			this.filters = '';
			if (search) {
				this.filters += `&${API_PARAM_KEYS.SEARCH}${search}`;
			}
			if (status) {
				this.filters += `&${API_PARAM_KEYS.STATUS}${status}`;
			}
			if (page && perPage) {
				this.filters += `&${API_PARAM_KEYS.PAGE}${page}&${API_PARAM_KEYS.PER_PAGE}${perPage}`;
			}
			return this.filters;
		} catch (error) {
			console.error(error);
		}
	}

	async getTodos(
		userId: number,
		filters?: FilterType | null,
	): Promise<{ todos: ITodoType[]; totalCount: number } | null> {
		try {
			const filterParams = filters ? this.addFilterParams(filters) : '';

			const { data } = (await this.get({
				url: `${API_KEYS.TODOS_ALL}?${API_PARAM_KEYS.USER_ID}${userId}${filterParams}`,
			})) as TDataResponse;

			const { todos, totalCount } = data;

			updateStoreCallback(todos, totalCount);

			return { todos, totalCount };
		} catch (error) {
			console.error(error);
		}
	}

	async createTodo(
		userId: number,
		todoBody: ITodoCreateRequestDto,
	): Promise<ITodoType | null> {
		try {
			const { data } = await this.post({
				url: `${API_KEYS.TODOS_ROOT}?${API_PARAM_KEYS.USER_ID}${userId}`,
				data: todoBody,
			});

			if (!data) {
				return null;
			}

			addTodoCallback(data as ITodoType);

			return data as ITodoType;
		} catch (error) {
			console.error(error);
		}
	}

	async getTodoById(todoId: number): Promise<ITodoType | null> {
		try {
			const { data } = await this.get({
				url: `${API_KEYS.TODOS_ROOT}${todoId}`,
			});
			return data as ITodoType;
		} catch (error) {
			console.error(error);
		}
	}

	async updateTodo(
		todoId: number,
		todoBody: ITodoUpdateRequestDto,
	): Promise<ITodoType> {
		try {
			const { data } = await this.put({
				url: `${API_KEYS.TODOS_ROOT}${todoId}`,
				data: todoBody,
			});

			if (!data) {
				return null;
			}

			updateTodoCallback(data as ITodoType);

			return data as ITodoType;
		} catch (error) {
			console.error(error);
		}
	}

	async deleteTodo(todoId: number): Promise<ITodoType> {
		try {
			const { data } = await this.delete({
				url: `${API_KEYS.TODOS_ROOT}${todoId}`,
			});

			if (!data) {
				return null;
			}

			const { id } = data as ITodoType;

			deleteTodoCallback(id);

			return data as ITodoType;
		} catch (error) {
			console.error(error);
		}
	}
}

const todoService = new TodoService();

export { todoService };
