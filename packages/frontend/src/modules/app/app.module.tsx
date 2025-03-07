import React, { useCallback, useEffect, useState } from 'react';
import { todoService } from '~/api/services/todo.service';
import { RouterProvider } from '~router/router-provider';
import { todosStore } from '~store/todos.store';
import { ROUTER_KEYS } from '~shared/keys';
import { RootPage } from '~/components/root-page/root-page';
import { AuthScreen } from '~/components/auth/auth-screen';
import { Dashboard } from '~/components/dashboard/dashboard.component';
import { TodoSingleView } from '~/components/todo/single-view/single-view.component';
import { ProtectedRoute } from '~router/protected-route.util';
import { AuthConfirmPage } from '~/components/auth/auth-confirm.component';
import { ProfilePage } from '~/components/profile/profile-page.component';
import { FilterType } from '~shared/types/filters/filters-type';
import { userService } from '~/api/services/user.service';

const App = (): React.ReactNode => {
	const { isAuthorized, loading, setLoading } = todosStore(
		({ isAuthorized, userId, loading, setLoading }) => {
			return { isAuthorized, userId, loading, setLoading };
		},
	);

	const serverIsConnected = todosStore((state) => state.serverConection);

	const [logedIn, setLogedIn] = useState(isAuthorized);

	const requestTodos = useCallback(
		async (filters: FilterType = null): Promise<void> => {
			await todoService.getTodos(filters);
		},
		[],
	);

	useEffect(() => {
		setLogedIn(isAuthorized);
		if (isAuthorized) {
			requestTodos();
		}
	}, [isAuthorized]);

	useEffect((): void => {
		if (!serverIsConnected) {
			userService.init();
			setTimeout(() => setLoading(false), 1000);
		}
	}, []);

	return (
		<RouterProvider
			routes={[
				{
					path: ROUTER_KEYS.ROOT,
					children: [
						{
							path: ROUTER_KEYS.ROOT,
							element: <RootPage isLoading={loading} />,
						},
						{
							path: ROUTER_KEYS.DASHBOARD,
							element: (
								<ProtectedRoute
									isAuthed={logedIn}
									redirectPath={ROUTER_KEYS.ROOT}
								>
									<Dashboard
										getTodosHandler={requestTodos}
										isLoading={loading}
									/>
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
									<AuthScreen isLoading={loading} />
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
									<AuthScreen isLoading={loading} />
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
									<ProfilePage isLoading={loading} />
								</ProtectedRoute>
							),
						},
						{
							path: ROUTER_KEYS.VERIFY_EMAIL,
							element: <AuthConfirmPage />,
						},
						{
							path: ROUTER_KEYS.RESET_PASSWORD,
							element: <AuthScreen isLoading={loading} />,
						},
						{
							path: ROUTER_KEYS.RESET_PASSWORD_CONFIRM,
							element: <AuthScreen isLoading={loading} />,
						},
					],
				},
			]}
		/>
	);
};

export { App };
