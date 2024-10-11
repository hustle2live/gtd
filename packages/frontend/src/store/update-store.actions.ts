import { unstable_batchedUpdates } from 'react-dom';
import { ITodoType } from '~shared/types/todo/todo.types';
import { todosStore } from './todos.store';

export const updateStoreCallback = (data: ITodoType[], total: number): void => {
	unstable_batchedUpdates(() =>
		todosStore.getState().updateStore(data, total),
	);
};

export const addTodoCallback = (data: ITodoType): void => {
	unstable_batchedUpdates(() => todosStore.getState().addTodo(data));
};

export const updateTodoCallback = (data: ITodoType): void => {
	unstable_batchedUpdates(() => todosStore.getState().updateTodo(data));
};

export const deleteTodoCallback = (todoId: number): void => {
	unstable_batchedUpdates(() => todosStore.getState().deleteTodo(todoId));
};

export const setLoadingCallback = (value: boolean): void => {
	unstable_batchedUpdates(() => todosStore.getState().setLoading(value));
};
