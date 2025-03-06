import axios, { AxiosResponse, AxiosRequestConfig, AxiosStatic } from 'axios';
import { authService } from './auth.service';
import newHttpService from '../logger/errorHandler.service';

interface HttpServiceInterface {
	get: <T>(
		config: AxiosRequestConfig,
		withAuth: boolean,
	) => Promise<AxiosResponse<T>>;
	put: <T>(
		config: AxiosRequestConfig,
		withAuth: boolean,
	) => Promise<AxiosResponse<T>>;
	post: <T>(
		config: AxiosRequestConfig,
		withAuth: boolean,
	) => Promise<AxiosResponse<T>>;
	delete: <T>(
		config: AxiosRequestConfig,
		withAuth: boolean,
	) => Promise<AxiosResponse<T>>;
}

class HttpService implements HttpServiceInterface {
	baseUrl: string;
	fetchingService: AxiosStatic;
	apiVersion: string;
	authService = authService;

	constructor(
		baseUrl = process.env.SERVER_URL,
		fetchingService = axios,
		apiVersion = 'api',
	) {
		this.baseUrl = baseUrl;
		this.fetchingService = fetchingService;
		this.apiVersion = apiVersion;
	}

	private getFullApiUrl(url: string): string {
		return `${this.baseUrl}/${this.apiVersion}/${url}`;
	}

	private populateTokenToHeaderConfig(): {
		Authorization: string | null;
	} {
		const token = this.authService.getToken();
		return {
			Authorization: `Bearer ${token}`,
		};
	}

	private extractUrlAndDataFromConfig(
		requestConfig: AxiosRequestConfig,
	): Partial<AxiosRequestConfig> {
		const { data, url, ...configWithoutDataAndUrl } = requestConfig;
		return configWithoutDataAndUrl;
	}

	get<T>(
		config: AxiosRequestConfig,
		withAuth = true,
	): Promise<AxiosResponse<T>> {
		if (withAuth) {
			const authHeaders = this.populateTokenToHeaderConfig();
			config.headers = {
				...config.headers,
				...authHeaders,
			};
		}
		return this.fetchingService.get(
			this.getFullApiUrl(config.url),
			this.extractUrlAndDataFromConfig(config),
		);
	}

	put<T>(
		config: AxiosRequestConfig,
		withAuth = true,
	): Promise<AxiosResponse<T>> {
		if (withAuth) {
			const authHeaders = this.populateTokenToHeaderConfig();
			config.headers = {
				...config.headers,
				...authHeaders,
			};
		}
		return this.fetchingService.put(
			this.getFullApiUrl(config.url),
			config.data,
			this.extractUrlAndDataFromConfig(config),
		);
	}

	post<T>(
		config: AxiosRequestConfig,
		withAuth = true,
	): Promise<AxiosResponse<T>> {
		if (withAuth) {
			const authHeaders = this.populateTokenToHeaderConfig();
			config.headers = {
				...config.headers,
				...authHeaders,
			};
		}
		return this.fetchingService.post(
			this.getFullApiUrl(config.url),
			config.data,
			this.extractUrlAndDataFromConfig(config),
		);
	}

	delete<T>(
		config: AxiosRequestConfig,
		withAuth = true,
	): Promise<AxiosResponse<T>> {
		if (withAuth) {
			const authHeaders = this.populateTokenToHeaderConfig();
			config.headers = {
				...config.headers,
				...authHeaders,
			};
		}

		return this.fetchingService.delete(
			this.getFullApiUrl(config.url),
			this.extractUrlAndDataFromConfig(config),
		);
	}
}

export { HttpServiceInterface, HttpService };

export default newHttpService;
