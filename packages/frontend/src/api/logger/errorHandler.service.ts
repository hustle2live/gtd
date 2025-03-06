import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpServiceInterface } from '../services/http.service';
import {
	setErrorAction,
	setLoadingCallback,
} from '~store/update-store.actions';

class ErrorHandler implements HttpServiceInterface {
	private service: HttpServiceInterface | null = null;
	private notifier = setErrorAction;
	private loading = setLoadingCallback;

	constructor(httpService: HttpServiceInterface) {
		this.service = httpService;
	}

	private setError(text: string): void {
		this.notifier(text);
		this.loading(false);
	}

	async handleError<T>(
		func: <T>(
			config: AxiosRequestConfig,
			withAuth?: boolean,
		) => Promise<AxiosResponse<T>>,
		payload: { config: AxiosRequestConfig; withAuth?: boolean },
	): Promise<AxiosResponse<T>> {
		try {
			const data = await func<T>(payload.config, payload.withAuth);
			if (data.status !== 200) {
				throw new Error();
			}

			return data;
		} catch (error) {
			this.setError(error?.message ?? error);
			return error;
		}
	}

	async get<T>(
		config: AxiosRequestConfig,
		withAuth?: boolean,
	): Promise<AxiosResponse<T>> {
		const action = this.service.get.bind(this.service);
		return await this.handleError<T>(action, { config, withAuth });
	}

	async put<T>(
		config: AxiosRequestConfig,
		withAuth?: boolean,
	): Promise<AxiosResponse<T>> {
		const action = this.service.put.bind(this.service);
		return await this.handleError<T>(action, { config, withAuth });
	}

	async post<T>(
		config: AxiosRequestConfig,
		withAuth?: boolean,
	): Promise<AxiosResponse<T>> {
		const action = this.service.post.bind(this.service);
		return await this.handleError<T>(action, {
			config,
			withAuth,
		});
	}

	async delete<T>(
		config: AxiosRequestConfig,
		withAuth?: boolean,
	): Promise<AxiosResponse<T>> {
		const action = this.service.delete.bind(this.service);
		return await this.handleError<T>(action, {
			config,
			withAuth,
		});
	}
}

export default ErrorHandler;
