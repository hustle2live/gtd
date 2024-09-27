import { Router } from 'express';
import { ApiPATH } from '../../libs/constants/api-path';

import { TodoActions } from '../../controllers/todo.actions';

import { todoValidationSchema as TodoSchema } from '@/libs/validation-schema/todo';
import { TodoValidationMiddleware as Middleware } from '@/middleware/todo.middleware';
import { TryCatchMiddleware as TryCatch } from '@/middleware/try-catch.middleware';
import { IsExistMiddleware } from '@/middleware/is-exist.middleware';

import { client } from '@/client';
import { AuthMiddleware } from '@/middleware/auth.middleware';

const todosRouter: Router = Router();

todosRouter.get(ApiPATH.ALL_PUBLIC, TryCatch(TodoActions.getAllPublic));

todosRouter.get(
	ApiPATH.ALL,
	AuthMiddleware,
	TryCatch(TodoActions.getAllUserTodos),
);

todosRouter.post(
	ApiPATH.ROOT,
	AuthMiddleware,
	Middleware(TodoSchema.create),
	TryCatch(TodoActions.create),
);

todosRouter.get(
	ApiPATH._ID,
	IsExistMiddleware(client),
	TryCatch(TodoActions.getOne),
);
todosRouter.put(
	ApiPATH._ID,
	AuthMiddleware,
	IsExistMiddleware(client),
	Middleware(TodoSchema.update),
	TryCatch(TodoActions.update),
);
todosRouter.delete(
	ApiPATH._ID,
	AuthMiddleware,
	IsExistMiddleware(client),
	TryCatch(TodoActions.delete),
);

export default todosRouter;
