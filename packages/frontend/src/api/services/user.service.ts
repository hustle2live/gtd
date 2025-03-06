import {
	IResetUserData,
	IUserRegisterDto,
	IUserResponseDto,
} from '~shared/types/user/user.types';

import newHttpService, {
	HttpService,
	HttpServiceInterface,
} from './http.service';

import { createUserModel, UserModel } from '../models/user.model';
import { API_KEYS, API_PARAM_KEYS, SERVER_INIT_RESPONSE } from '~shared/keys';
import {
	setErrorAction,
	setLoadingCallback,
	updateConnection,
} from '~store/update-store.actions';

type ResponseMessage = { message: string };

class UserService extends newHttpService {
	withoutAuth = false;
	constructor(service: HttpServiceInterface) {
		super(service);
	}

	async init(): Promise<void> {
		console.log('init server connection..');
		const { data } = await this.get({ url: '' }, this.withoutAuth);
		if (data === SERVER_INIT_RESPONSE) {
			updateConnection(true);
		} else {
			throw Error('Server does not answer');
		}
		setLoadingCallback(false);
	}

	async getUsers(): Promise<IUserResponseDto[] | null> {
		const { data } = await this.get({
			url: API_KEYS.USERS_ALL,
		});

		if (!data) {
			return null;
		}
		setLoadingCallback(false);
		return data as IUserResponseDto[];
	}

	async login(user: IUserRegisterDto): Promise<UserModel | null> {
		setLoadingCallback(true);
		const { data } = await this.post(
			{
				url: API_KEYS.LOGIN,
				data: user,
			},
			this.withoutAuth,
		);

		if (!data) {
			setErrorAction('invalid login or password');
			return null;
		}
		setLoadingCallback(false);
		return createUserModel(data as IUserResponseDto);
	}

	async register(user: IUserRegisterDto): Promise<ResponseMessage> {
		setLoadingCallback(true);
		const { data } = await this.post(
			{
				url: API_KEYS.REGISTER,
				data: user,
			},
			this.withoutAuth,
		);
		setLoadingCallback(false);
		return data as ResponseMessage;
	}

	async updateData(
		userId: number,
		userBody: Partial<UserModel>,
	): Promise<UserModel | null> {
		setLoadingCallback(true);
		const { data } = await this.put({
			url: `${API_KEYS.USER_ROOT}${userId}`,
			data: userBody,
		});

		if (!data) {
			return null;
		}
		setLoadingCallback(false);
		return createUserModel(data as IUserResponseDto);
	}

	async passwordReset(
		user: Pick<IUserRegisterDto, 'email'>,
	): Promise<ResponseMessage | null> {
		setLoadingCallback(true);

		const { data } = await this.post(
			{
				url: API_KEYS.RESET_PASSWORD_REQUEST,
				data: user,
			},
			this.withoutAuth,
		);

		if (!data) {
			setErrorAction('invalid credentials');
			return null;
		}
		setLoadingCallback(false);
		return data as ResponseMessage;
	}

	async verificationConfirm({
		email,
		token,
		password = null,
	}: IResetUserData): Promise<ResponseMessage | null> {
		setLoadingCallback(true);
		const additional = password
			? `&${API_PARAM_KEYS.PASSWORD}${password}`
			: '';
		const endpoint = password
			? API_KEYS.RESET_PASSWORD
			: API_KEYS.VERIFY_URL;
		const { data } = await this.get(
			{
				url: `${endpoint}?${API_PARAM_KEYS.TOKEN}${token}&${API_PARAM_KEYS.EMAIL}${email}${additional}`,
			},
			this.withoutAuth,
		);

		setLoadingCallback(false);
		return data as ResponseMessage;
	}
}

const userService = new UserService(new HttpService());

export { userService };

export default UserService;
