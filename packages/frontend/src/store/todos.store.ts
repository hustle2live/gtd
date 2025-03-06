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
	loading: boolean;
	serverConection: boolean;
};

export interface ITodosStore extends TInitialState, IErrorState {
	updateStore: (data: ITodoType[], total: number) => void;
	updateTodo: (data: ITodoType) => void;
	addTodo: (data: ITodoType) => void;
	deleteTodo: (todoId: number) => void;
	onLogin: (user: UserModel) => void;
	updateUser: (user: Pick<UserModel, 'email' | 'name'>) => void;
	onLogout: () => void;
	setLoading: (value: boolean) => void;
	setServerConection: (value: boolean) => void;
}

interface IErrorState {
	isError: boolean;
	errorMessage: string;
	setError: (x?: string) => void;
}

const initialState: TInitialState & Omit<IErrorState, 'setError'> = {
	userId: null,
	authToken: null,
	isAuthorized: false,
	todos: [],
	totalCount: 0,
	userName: null,
	userEmail: null,
	loading: true,
	serverConection: false,
	isError: false,
	errorMessage: '',
};

export const todosStore = create<ITodosStore>()(
	persist(
		(set) => ({
			...initialState,
			setError: (error: string = ''): void => {
				set(() => {
					return error
						? { isError: true, errorMessage: error }
						: { isError: false, errorMessage: '' };
				});
			},
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
			setLoading: (value): void => {
				set(() => {
					return { loading: value };
				});
			},
			setServerConection: (value): void => {
				set(() => {
					return { serverConection: value };
				});
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
