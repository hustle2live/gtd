import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import { Request, Response } from 'express';

import { UserService, userServiceDatabase } from '@/services/user.service';
import { authKeyValues } from '@/libs/constants/auth-keys';
import { HttpStatusCodes } from '@/libs/constants/status-code';
import { ErrorMessage } from '@/libs/constants/error-message';
import {
	UserResponseDto,
	UserResponseTokenDto,
} from '@/libs/types/user-response-dto.type';

export class AuthService {
	userService: UserService;
	authKey: typeof authKeyValues;

	constructor(service: UserService) {
		this.userService = service;
		this.authKey = authKeyValues;
	}

	createToken(userId: string): string {
		return jwt.sign({ id: userId }, this.authKey.secretKey, {
			expiresIn: this.authKey.expirationAge,
		});
	}

	createVerificationToken(): string {
		return crypto.randomBytes(32).toString('hex');
	}

	async createHash(password: string): Promise<string> {
		return await bcrypt.hash(password, this.authKey.saltNumber);
	}

	async searchEmail(email: string): Promise<boolean> {
		return await this.userService.isExist(email);
	}

	async changePassword(
		userIdFromToken: number,
		requestedUserEmail: string,
		userPasswordEncrypted: string,
	): Promise<UserResponseDto | void> {
		const user = await this.userService.getById(userIdFromToken);

		if (user?.email !== requestedUserEmail) {
			throw Error(ErrorMessage.EMAIL_INVALID);
		}

		const createHash = await this.createHash(userPasswordEncrypted);
		const hashedPassword = {
			password: createHash,
		};

		const userUpdated = await this.userService.update(
			userIdFromToken,
			hashedPassword,
		);

		return userUpdated;
	}

	async createPasswordRequest(
		email: string,
	): Promise<UserResponseDto | null> {
		const { id } = (await this.userService.getByEmail(
			email,
		)) as UserResponseDto;

		const newToken = this.createVerificationToken();

		const newUser = await this.userService.update(id, {
			verificationtoken: newToken,
		});

		return newUser;
	}

	async checkAuth(email: string): Promise<boolean> {
		return await this.userService.isVerified(email);
	}

	async verifyUser(
		email: string,
		token: string,
	): Promise<UserResponseDto | null> {
		const user = (await this.userService.getByEmail(
			email,
		)) as UserResponseDto;

		if (!user.verificationtoken || token !== user.verificationtoken) {
			throw Error(ErrorMessage.REGISTRATION_FAILED);
		}

		const userVerified = await this.userService.update(user.id, {
			isverified: true,
		});

		return userVerified;
	}

	async login(
		req: Request,
		res: Response,
	): Promise<UserResponseTokenDto | null> {
		const { email, password } = req.body;

		const user = await this.userService.getByEmail(email);
		if (!user) {
			res.statusCode = HttpStatusCodes.UNAUTHORIZED;
			throw Error(ErrorMessage.EMAIL_INVALID);
		}

		if (!user.isverified) {
			res.statusCode = HttpStatusCodes.UNAUTHORIZED;
			throw Error(ErrorMessage.VERIFICATION_TOKEN_ERROR);
		}

		const hashedPassword = await this.userService.getHashedPassword(email);
		if (!hashedPassword) {
			throw Error(ErrorMessage.LOGIN_FAILED);
		}

		const isMatched = await bcrypt.compare(
			password,
			hashedPassword.password,
		);

		if (!isMatched) {
			res.statusCode = HttpStatusCodes.UNAUTHORIZED;
			throw Error(ErrorMessage.PASSWORD_INVALID);
		}
		const createToken = this.createToken(JSON.stringify(user.id));
		return { ...user, token: createToken };
	}

	async register(req: Request): Promise<UserResponseDto | null> {
		const { password } = req.body;
		const createHash = await this.createHash(password);
		const verificationToken = this.createVerificationToken();

		const userWithHasheddata = {
			...req.body,
			password: createHash,
			verificationtoken: verificationToken,
		};
		const newUser = await this.userService.create(userWithHasheddata);
		return newUser;
	}
}

const authService = new AuthService(userServiceDatabase);

export { authService };
