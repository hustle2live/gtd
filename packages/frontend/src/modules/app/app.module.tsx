import React, { useCallback, useEffect, useState } from 'react';
import { todoService } from '~/api/services/todo.service';
import { RouterProvider } from '~router/router-provider';
import { ITodosStore, todosStore } from '~store/todos.store';
import { ROUTER_KEYS } from '~shared/keys';
import { Header } from '~/components/header/header.component';
import { RootPage } from '~/components/root-page/root-page';
import { AuthScreen } from '~/components/auth/auth-screen';
import { Dashboard } from '~/components/dashboard/dashboard.component';
import { TodoSingleView } from '~/components/todo/single-view/single-view.component';
import { ProtectedRoute } from '~router/protected-route.util';
import { AuthConfirmPage } from '~/components/auth/auth-confirm.component';
import { ProfilePage } from '~/components/profile/profile-page.component';
import { FilterType } from '~shared/types/filters/filters-type';

const App = (): React.ReactNode => {
	const isAuthorized = todosStore((state: ITodosStore) => state.isAuthorized);
	const getUserId = todosStore((state: ITodosStore) => state.userId);

	const [logedIn, setLogedIn] = useState(isAuthorized);

	useEffect(() => {
		setLogedIn(isAuthorized);
	}, [isAuthorized]);

	const requestTodos = useCallback(
		async (filters: FilterType = null): Promise<void> => {
			await todoService.getTodos(getUserId, filters);
		},
		[],
	);

	useEffect((): void => {
		if (isAuthorized) {
			requestTodos();
		}
	}, [isAuthorized]);

	return (
		<RouterProvider
			routes={[
				{
					path: ROUTER_KEYS.ROOT,
					children: [
						{
							path: ROUTER_KEYS.ROOT,
							element: <RootPage />,
						},
						{
							path: ROUTER_KEYS.DASHBOARD,
							element: (
								<ProtectedRoute
									isAuthed={logedIn}
									redirectPath={ROUTER_KEYS.ROOT}
								>
									<Dashboard getTodosHandler={requestTodos} />
								</ProtectedRoute>
							),
						},
						{
							path: ROUTER_KEYS.LOGIN,
							element: (
								<ProtectedRoute
									isAuthed={!logedIn}
									redirectPath={ROUTER_KEYS.DASHBOARD}
								>
									<AuthScreen />
								</ProtectedRoute>
							),
						},
						{
							path: ROUTER_KEYS.SIGN_UP,
							element: (
								<ProtectedRoute
									isAuthed={!logedIn}
									redirectPath={ROUTER_KEYS.DASHBOARD}
								>
									<AuthScreen />
								</ProtectedRoute>
							),
						},
						{
							path: ROUTER_KEYS.TODO_$ID,
							element: (
								<ProtectedRoute
									isAuthed={logedIn}
									redirectPath={ROUTER_KEYS.ROOT}
								>
									<TodoSingleView />
								</ProtectedRoute>
							),
						},
						{
							path: ROUTER_KEYS.PROFILE,
							element: (
								<ProtectedRoute
									isAuthed={logedIn}
									redirectPath={ROUTER_KEYS.ROOT}
								>
									<Header hideProfile={true} />
									<ProfilePage />
								</ProtectedRoute>
							),
						},
						{
							path: ROUTER_KEYS.VERIFY_EMAIL,
							element: <AuthConfirmPage />,
						},
						{
							path: ROUTER_KEYS.RESET_PASSWORD,
							element: <AuthScreen />,
						},
						{
							path: ROUTER_KEYS.RESET_PASSWORD_CONFIRM,
							element: <AuthScreen />,
						},
					],
				},
			]}
		/>
	);
};

export { App };
