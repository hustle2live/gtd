import axios, { AxiosResponse, AxiosRequestConfig, AxiosStatic } from 'axios';
import AuthService, { authService } from './auth.service';

class HttpService {
	baseUrl: string;
	fetchingService: AxiosStatic;
	apiVersion: string;
	authService: AuthService;

	constructor(
		baseUrl = process.env.SERVER_URL,
		fetchingService = axios,
		apiVersion = 'api',
	) {
		this.baseUrl = baseUrl;
		this.fetchingService = fetchingService;
		this.apiVersion = apiVersion;
		this.authService = authService;
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

export default HttpService;
