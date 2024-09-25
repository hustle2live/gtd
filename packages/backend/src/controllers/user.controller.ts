import { Response, Request } from 'express';
import { userServiceDatabase, type UserService } from '@/services/user.service';
import { HttpStatusCodes as HttpCode } from '@/libs/constants/status-code';

import { ErrorMessage as Message } from '@/libs/constants/error-message';
import { UserCreateRequestDto } from '@/libs/types/user-create-request-dto.type';
import { UserUpdateRequestDto } from '@/libs/types/user-update-request-dto.type';
import { UserResponseDto } from '@/libs/types/user-response-dto.type';

export class UserController {
	private userService: UserService;

	constructor(service: UserService) {
		this.userService = service;
	}

	async getAll(req: Request, res: Response): Promise<void> {
		const users = await this.userService.getAllUsers();
		if (!users) {
			throw Error(Message.UNKNOWN);
		}

		res.status(HttpCode.OK).send(users);
	}

	async searchByEmail(req: Request, res: Response): Promise<void> {
		const { email } = req.body;
		const user = await this.userService.getByEmail(email);

		if (!user) {
			res.statusCode = HttpCode.NOT_FOUND;
			throw Error(Message.NOT_FOUND);
		}

		res.status(HttpCode.OK).send(user);
	}

	async searchById(req: Request, res: Response): Promise<void> {
		const userId = Number(req.params?.id);

		const user = await this.userService.getById(userId);

		if (!user) {
			res.statusCode = HttpCode.NOT_FOUND;
			throw Error(Message.NOT_FOUND);
		}

		res.status(HttpCode.OK).send(user);
	}

	async create(req: Request, res: Response): Promise<void> {
		const userBody: UserCreateRequestDto = req.body;

		const isEmailAlreadyExist = await this.userService.isExist(
			userBody.email,
		);

		if (isEmailAlreadyExist) {
			res.statusCode = HttpCode.BAD_REQUEST;
			throw Error('Email already exist');
		}

		const newUser: UserResponseDto | null =
			await this.userService.create(userBody);

		if (!newUser) {
			res.statusCode = HttpCode.INTERNAL_SERVER_ERROR;
			throw Error('Can not create user');
		}

		res.status(HttpCode.OK).send(newUser);
	}

	async update(req: Request, res: Response): Promise<void> {
		const userId = Number(req.params.id);
		const userBody: UserUpdateRequestDto = req.body;

		const updateUser = await this.userService.update(userId, userBody);

		if (!updateUser) {
			throw Error('Can not update user');
		}
		res.status(HttpCode.OK).send(updateUser);
	}
}

const userController = new UserController(userServiceDatabase);

export default userController;
