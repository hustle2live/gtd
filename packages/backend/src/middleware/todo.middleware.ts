import { Response, Request, NextFunction } from 'express';
import joi from 'joi';

import { HttpStatusCodes } from '@/libs/constants/status-code';
import { ErrorMessage } from '@/libs/constants/error-message';

type IMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => Promise<void>;

export const TodoValidationMiddleware = <T>(
	schema: joi.ObjectSchema<T>,
): IMiddleware => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const requestBody = req.body;

			const isValid = schema.validate(requestBody);
			if (isValid.error) {
				throw Error(isValid.error.message);
			}

			next();
		} catch (error) {
			res.status(HttpStatusCodes.BAD_REQUEST).json({
				message:
					error instanceof Error
						? error.message
						: ErrorMessage.UNKNOWN,
			});
		}
	};
};
