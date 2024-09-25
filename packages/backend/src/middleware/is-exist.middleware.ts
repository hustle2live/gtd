import { Response, Request, NextFunction } from 'express';
import { HttpStatusCodes } from '@/libs/constants/status-code';

import { ErrorMessage } from '@/libs/constants/error-message';

import { type PrismaClient } from '@/client';

type IMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => Promise<void>;

export const IsExistMiddleware = (context: PrismaClient): IMiddleware => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const reqId = Number(req.params.id);

			const record = await context.todo.findUnique({
				where: { id: reqId },
			});

			if (!record) {
				throw Error(ErrorMessage.NOT_FOUND);
			}

			next();
		} catch (error) {
			res.status(HttpStatusCodes.NOT_FOUND).json({
				message:
					error instanceof Error
						? error.message
						: ErrorMessage.UNKNOWN,
			});
		}
	};
};
