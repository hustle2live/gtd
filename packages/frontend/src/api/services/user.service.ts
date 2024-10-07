import {
	IResetUserData,
	IUserRegisterDto,
	IUserResponseDto,
} from '~shared/types/user/user.types';

import HttpService from './http.service';

import { createUserModel, UserModel } from '../models/user.model';
import { API_KEYS, API_PARAM_KEYS } from '~shared/keys';

type ResponseMessage = { message: string };

class UserService extends HttpService {
	withoutAuth = false;
	constructor() {
		super();
	}

	async getUsers(): Promise<IUserResponseDto[] | null> {
		try {
			const { data } = await this.get({
				url: API_KEYS.USERS_ALL,
			});

			if (!data) {
				return null;
			}

			return data as IUserResponseDto[];
		} catch (error) {
			console.error(error);
		}
	}

	async login(user: IUserRegisterDto): Promise<UserModel | null> {
		try {
			const { data } = await this.post(
				{
					url: API_KEYS.LOGIN,
					data: user,
				},
				this.withoutAuth,
			);

			if (!data) {
				return null;
			}

			return createUserModel(data as IUserResponseDto);
		} catch (error) {
			console.error(error);
		}
	}

	async register(user: IUserRegisterDto): Promise<ResponseMessage> {
		try {
			const { data } = await this.post(
				{
					url: API_KEYS.REGISTER,
					data: user,
				},
				this.withoutAuth,
			);

			return data as ResponseMessage;
		} catch (error) {
			console.error(error);
		}
	}

	async updateData(
		userId: number,
		userBody: Partial<UserModel>,
	): Promise<UserModel | null> {
		try {
			const { data } = await this.put({
				url: `${API_KEYS.USER_ROOT}${userId}`,
				data: userBody,
			});

			if (!data) {
				return null;
			}

			return createUserModel(data as IUserResponseDto);
		} catch (error) {
			console.error(error);
		}
	}

	async passwordReset(
		user: Pick<IUserRegisterDto, 'email'>,
	): Promise<ResponseMessage | null> {
		try {
			const { data } = await this.post(
				{
					url: API_KEYS.RESET_PASSWORD_REQUEST,
					data: user,
				},
				this.withoutAuth,
			);

			if (!data) {
				return null;
			}

			return data as ResponseMessage;
		} catch (error) {
			console.error(error);
		}
	}

	async verificationConfirm({
		email,
		token,
		password = null,
	}: IResetUserData): Promise<ResponseMessage | null> {
		try {
			const additional = password
				? `&${API_PARAM_KEYS.PASSWORD}${password}`
				: '';
			const endpoint = password
				? API_KEYS.RESET_PASSWORD
				: API_KEYS.VERIFY_URL;
			const { data } = await this.get({
				url: `${endpoint}?${API_PARAM_KEYS.TOKEN}${token}&${API_PARAM_KEYS.EMAIL}${email}${additional}`,
			});

			return data as ResponseMessage;
		} catch (error) {
			console.error(error);
		}
	}
}

const userService = new UserService();

export { userService };

export default UserService;
