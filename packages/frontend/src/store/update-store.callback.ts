import { unstable_batchedUpdates } from 'react-dom';
import { ITodoType } from '~shared/types/todo/todo.types';
import { todosStore } from './todos.store';

export const updateStoreCallback = (data: ITodoType[], total: number): void => {
	unstable_batchedUpdates(() => {
		todosStore.getState().updateStore(data, total);
	});
};
