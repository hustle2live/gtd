import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { STORAGE_KEYS } from '~shared/keys';
import { ITodoType } from '~shared/types/todo/todo.types';
import { UserModel } from '~/api/models/user.model';

type TInitialState = {
	todos: ITodoType[];
	totalCount: number;
	userId: number | null;
	authToken: string | null;
	userName: string | null;
	userEmail: string | null;
	isAuthorized: boolean;
};
export interface ITodosStore extends TInitialState {
	updateStore: (data: ITodoType[], total: number) => void;
	updateTodo: (data: ITodoType) => void;
	addTodo: (data: ITodoType) => void;
	deleteTodo: (todoId: number) => void;
	onLogin: (user: UserModel) => void;
	updateUser: (user: Pick<UserModel, 'email' | 'name'>) => void;
	onLogout: () => void;
}

const initialState: TInitialState = {
	userId: null,
	authToken: null,
	isAuthorized: false,
	todos: [],
	totalCount: 0,
	userName: null,
	userEmail: null,
};

export const todosStore = create<ITodosStore>()(
	persist(
		(set) => ({
			...initialState,
			updateStore: (data, total = 0): void => {
				set({ todos: data, totalCount: total });
			},
			updateTodo: (data): void => {
				set((state) => {
					const modified = state.todos.map((item) => {
						return item.id === data.id ? data : item;
					});
					return { todos: modified };
				});
			},
			updateUser: ({ name, email }): void =>
				set((state) => ({
					userName: name ?? state.userName,
					userEmail: email ?? state.userEmail,
				})),
			addTodo: (data): void =>
				set((state) => ({
					todos: [...state.todos, data],
				})),
			deleteTodo: (id): void =>
				set((state) => ({
					todos: state.todos.filter((todo) => todo.id !== id),
				})),
			onLogin: (user): void => {
				set(() => ({
					userId: user.id,
					authToken: user.token,
					isAuthorized: true,
					userEmail: user.email,
					userName: user.name,
				}));
			},
			onLogout: (): void => {
				set(() => ({
					authToken: null,
					isAuthorized: false,
					userId: null,
				}));
			},
		}),
		{
			name: STORAGE_KEYS.APP_STORAGE,
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				[STORAGE_KEYS.TOKEN]: state.authToken,
				[STORAGE_KEYS.IS_AUTHORIZED]: state.isAuthorized,
				[STORAGE_KEYS.USER_ID]: state.userId,
			}),
		},
	),
);
