import React from 'react';

import {
	RouterProvider as ReactRouterProvider,
	RouteObject,
	createBrowserRouter,
} from 'react-router-dom';

type TRoutes = {
	routes: Pick<RouteObject, 'path' | 'children'>[];
};

const RouterProvider: React.FunctionComponent<TRoutes> = ({
	routes,
}: TRoutes): React.ReactNode => (
	<ReactRouterProvider router={createBrowserRouter(routes)} />
);

export { RouterProvider, type TRoutes };
