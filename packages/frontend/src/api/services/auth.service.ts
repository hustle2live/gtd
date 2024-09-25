import { STORAGE_KEYS } from '~shared/keys';

class AuthService {
	getToken(): void | undefined {
		const storage = localStorage.getItem(STORAGE_KEYS.APP_STORAGE);
		const { state } = JSON.parse(storage);
		return state[STORAGE_KEYS.TOKEN];
	}
}

const authService = new AuthService();

export { authService };

export default AuthService;
