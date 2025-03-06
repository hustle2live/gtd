import { unstable_batchedUpdates } from 'react-dom';
import { ITodoType } from '~shared/types/todo/todo.types';
import { todosStore } from './todos.store';

const updateStoreCallback = (data: ITodoType[], total: number): void => {
	unstable_batchedUpdates(() =>
		todosStore.getState().updateStore(data, total),
	);
};

const addTodoCallback = (data: ITodoType): void => {
	unstable_batchedUpdates(() => todosStore.getState().addTodo(data));
};

const updateTodoCallback = (data: ITodoType): void => {
	unstable_batchedUpdates(() => todosStore.getState().updateTodo(data));
};

const deleteTodoCallback = (todoId: number): void => {
	unstable_batchedUpdates(() => todosStore.getState().deleteTodo(todoId));
};

const setLoadingCallback = (value: boolean): void => {
	unstable_batchedUpdates(() => todosStore.getState().setLoading(value));
};

const getUserId = (): number | null => {
	return unstable_batchedUpdates(() => todosStore.getState().userId);
};

const updateConnection = (value: boolean): void => {
	unstable_batchedUpdates(() =>
		todosStore.getState().setServerConection(value),
	);
};

const setErrorAction = (value: string = ''): void => {
	unstable_batchedUpdates(() => todosStore.getState().setError(value));
};

export {
	updateStoreCallback,
	addTodoCallback,
	updateTodoCallback,
	deleteTodoCallback,
	setLoadingCallback,
	getUserId,
	updateConnection,
	setErrorAction,
};
