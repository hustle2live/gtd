import { Response, Request } from 'express';
import { HttpStatusCodes } from '@/libs/constants/status-code';

import { ErrorMessage } from '@/libs/constants/error-message';
import { authService, AuthService } from '@/services/auth.service';
import { UserVerificationRequestDto } from '@/libs/types/user-create-request-dto.type';
import { transporter } from '@/routes/api/transporter';
import {
	UserClientResponseDto,
	UserResponseDto,
} from '@/libs/types/user-response-dto.type';
import { ApiPATH } from '@/libs/constants/api-path';

export class AuthController {
	authService: AuthService;

	constructor(service: AuthService) {
		this.authService = service;
	}

	createAuthResponseModel(user: UserResponseDto): UserClientResponseDto {
		return {
			id: user.id,
			email: user.email,
			name: user.name,
			token: user?.token ?? '',
		};
	}

	async login(req: Request, res: Response): Promise<void> {
		const { email, password } = req.body;

		if (!email || !password) {
			res.statusCode = HttpStatusCodes.BAD_REQUEST;
			throw Error(ErrorMessage.LOGIN_FAILED);
		}

		const login = await this.authService.login(req, res);

		res.status(HttpStatusCodes.OK).send(login);
	}

	async register(req: Request, res: Response): Promise<void> {
		const { email, password } = req.body;
		if (!email || !password) {
			res.statusCode = HttpStatusCodes.BAD_REQUEST;
			throw Error(ErrorMessage.BODY_INVALID);
		}

		const alreadyExist = await this.authService.searchEmail(email);
		if (alreadyExist) {
			res.statusCode = HttpStatusCodes.BAD_REQUEST;
			throw new Error(ErrorMessage.EMAIL_EXIST);
		}

		const { verificationtoken } = (await this.authService.register(
			req,
		)) as UserResponseDto;

		await this.sendVerification(verificationtoken, email);

		res.status(HttpStatusCodes.SUCCESS).json({
			message: `Confirmation Link has been sent to your email: ${email} Please, follow to confirm registration.`,
		});
	}

	async sendVerification(
		token: string,
		email: string,
		resetPassword = false,
	): Promise<void> {
		const verificationLink = `${process.env.SITE_URL}${ApiPATH.EMAIL_CONFIRMATION}?token=${token}&email=${email}`;

		const changePasswordLink = `${process.env.SITE_URL}${ApiPATH.PASSWORD_RESET}?token=${token}&email=${email}`;

		const textContent = {
			confirmEmail: `To confirm your registration - Click the following link :  ${verificationLink}`,
			changePassword: `To change password - following by the link :  ${changePasswordLink}`,
		};

		await transporter.sendMail({
			from: process.env.EMAIL_AUTH_USERNAME,
			to: email,
			subject: resetPassword ? 'Password reset' : 'Email confirmation',
			text: resetPassword
				? textContent.changePassword
				: textContent.confirmEmail,
		});
	}

	async verify(req: Request, res: Response): Promise<void> {
		const { token, email } = req.query as UserVerificationRequestDto;

		if (!token || !email) {
			res.statusCode = HttpStatusCodes.BAD_REQUEST;
			throw Error(ErrorMessage.BODY_INVALID);
		}

		const verified = await this.authService.verifyUser(email, token);

		if (!verified) {
			res.statusCode = HttpStatusCodes.UNAUTHORIZED;
			throw Error(ErrorMessage.REGISTRATION_FAILED);
		}

		res.status(HttpStatusCodes.OK).json({
			message: 'Verification successful',
		});
	}

	async passwordResetRequest(req: Request, res: Response): Promise<void> {
		const { email } = req.body;

		const { verificationtoken } =
			(await this.authService.createPasswordRequest(
				email,
			)) as UserResponseDto;

		await this.sendVerification(verificationtoken, email, true);

		res.status(HttpStatusCodes.SUCCESS).json({
			message: 'Reset password link has been sent to your email.',
		});
	}

	async passwordReset(req: Request, res: Response): Promise<void> {
		const { email, password, token } =
			req.query as UserVerificationRequestDto;

		if (!email || !password || !token) {
			res.statusCode = HttpStatusCodes.BAD_REQUEST;
			throw Error(ErrorMessage.LOGIN_FAILED);
		}

		const verifiedUser = await this.authService.verifyUser(email, token);

		if (!verifiedUser) {
			res.statusCode = HttpStatusCodes.BAD_REQUEST;
			throw Error(ErrorMessage.REGISTRATION_FAILED);
		}

		const userData = (await this.authService.changePassword(
			verifiedUser.id,
			email,
			password,
		)) as UserResponseDto;

		if (!userData) {
			throw Error(ErrorMessage.UNKNOWN);
		}

		res.status(HttpStatusCodes.OK).json({
			message: 'Password reset succesfully. Go to login page',
		});
	}
}

const authController = new AuthController(authService);

export default authController;
