import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { STORAGE_KEYS } from '~shared/keys';
import { ITodoType } from '~shared/types/todo/todo.types';
import { UserModel } from '~/api/models/user.model';

export interface ITodosStore {
	todos: ITodoType[];
	totalCount: number;
	updateStore: (data: ITodoType[], total: number) => void;
	updateTodo: (data: ITodoType) => void;
	addTodo: (data: ITodoType) => void;
	deleteTodo: (todoId: number) => void;
	userId: number | null;
	authToken: string | null;
	userName: string | null;
	userEmail: string | null;
	isAuthorized: boolean;
	onLogin: (user: UserModel) => void;
	updateUser: (user: Pick<UserModel, 'email' | 'name'>) => void;
	onLogout: () => void;
}

export const todosStore = create<ITodosStore>()(
	persist(
		(set) => ({
			userId: null,
			authToken: null,
			isAuthorized: false,
			todos: [],
			totalCount: null,
			userName: null,
			userEmail: null,
			updateStore: (data, total): void =>
				set({ todos: data, totalCount: total || null }),
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
					todos: { ...state.todos, data },
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
			partialize: ({ authToken, isAuthorized, userId }) => ({
				[STORAGE_KEYS.TOKEN]: authToken,
				[STORAGE_KEYS.IS_AUTHORIZED]: isAuthorized,
				[STORAGE_KEYS.USER_ID]: userId,
			}),
		},
	),
);
