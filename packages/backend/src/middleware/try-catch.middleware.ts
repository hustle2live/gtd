import { Response, Request, NextFunction, RequestHandler } from 'express';

import { HttpStatusCodes } from '@/libs/constants/status-code';
import { ErrorMessage } from '@/libs/constants/error-message';

type IMiddleware<T> = (
	req: Request<T>,
	res: Response,
	next: NextFunction,
) => Promise<void>;

export const TryCatchMiddleware = <T>(
	func: IMiddleware<T>,
): RequestHandler<T> => {
	return async (
		req: Request<T>,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			await func(req, res, next);
		} catch (error) {
			const errorCode = res.statusCode
				? res.statusCode
				: HttpStatusCodes.INTERNAL_SERVER_ERROR;
			res.status(errorCode).json({
				message:
					error instanceof Error
						? error.message
						: ErrorMessage.UNKNOWN,
			});
		}
	};
};
