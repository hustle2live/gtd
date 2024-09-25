import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

import { HttpStatusCodes } from '@/libs/constants/status-code';
import { ErrorMessage } from '@/libs/constants/error-message';
import { authKeyValues } from '@/libs/constants/auth-keys';
import { extractBearerToken } from '@/helpers/helpers';

type DecodedToken = {
	id: string;
	exp: number;
	iat: number;
};

const AuthMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { authorization } = req.headers;

		const token = extractBearerToken(authorization);

		if (!authorization || !token) {
			res.statusCode = HttpStatusCodes.BAD_REQUEST;
			throw Error('Token is missed in header');
		}

		const decode = jwt.verify(token, authKeyValues.secretKey);

		const tokenUserId = (decode as DecodedToken).id;

		req.query.userId = tokenUserId;

		next();
	} catch (error) {
		const errorCode = res.statusCode || HttpStatusCodes.UNAUTHORIZED;
		res.status(errorCode).json({
			message:
				error instanceof Error ? error.message : ErrorMessage.UNKNOWN,
		});
	}
};

export { AuthMiddleware };
