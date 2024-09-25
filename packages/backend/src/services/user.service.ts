import { client, PrismaClient } from '@/client';
import { UserCreateRequestDto } from '@/libs/types/user-create-request-dto.type';
import { UserResponseDto } from '@/libs/types/user-response-dto.type';
import { UserUpdateRequestDto } from '@/libs/types/user-update-request-dto.type';

class UserService {
	private db: PrismaClient;
	withoutPassword;
	passwordOnly;

	constructor(service: PrismaClient) {
		this.db = service;
		this.withoutPassword = {
			id: true,
			email: true,
			name: true,
			isverified: true,
			verificationtoken: true,
		};
		this.passwordOnly = {
			password: true,
		};
	}

	async isExist(user_email: string): Promise<boolean> {
		const record = await this.db.user.findFirst({
			where: { email: user_email },
		});
		return Boolean(record);
	}

	async isVerified(user_email: string): Promise<boolean> {
		const record = await this.db.user.findFirst({
			where: { email: user_email },
			select: { isverified: true },
		});
		return Boolean(record?.isverified);
	}

	async getByEmail(user_email: string): Promise<UserResponseDto | null> {
		return await this.db.user.findFirst({
			where: { email: user_email },
			select: this.withoutPassword,
		});
	}

	async getPassword(
		user_email: string,
	): Promise<{ password: string } | null> {
		return await this.db.user.findFirst({
			where: { email: user_email },
			select: this.passwordOnly,
		});
	}

	async getById(user_id: number): Promise<UserResponseDto | null> {
		const userRecord = await this.db.user.findFirst({
			where: { id: user_id },
			select: this.withoutPassword,
		});
		return userRecord ?? null;
	}

	async getAllUsers(): Promise<UserResponseDto[] | []> {
		return await this.db.user.findMany({ select: this.withoutPassword });
	}

	async getHashedPassword(
		user_email: string,
	): Promise<{ password: string } | null> {
		const user = await this.db.user.findFirst({
			where: { email: user_email },
			select: this.passwordOnly,
		});
		if (!user || !user.password) {
			return null;
		}
		return { password: user.password };
	}

	async create(user_data: UserCreateRequestDto): Promise<UserResponseDto> {
		const newUser = await this.db.user.create({
			data: user_data,
			select: this.withoutPassword,
		});
		return newUser;
	}

	async update(
		user_id: number,
		user_body: UserUpdateRequestDto,
	): Promise<UserResponseDto> {
		const updatedUser = await this.db.user.update({
			where: { id: user_id },
			data: {
				...user_body,
			},
			select: this.withoutPassword,
		});
		return updatedUser;
	}

	async delete(user_id: number): Promise<UserResponseDto | null> {
		const deleted = await this.db.user.delete({
			where: { id: user_id },
			select: this.withoutPassword,
		});
		return deleted ?? null;
	}
}

const userService = new UserService(client);

export { type UserService, userService as userServiceDatabase };
