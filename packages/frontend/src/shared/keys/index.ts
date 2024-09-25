export const enum ROUTER_KEYS {
	ROOT = '/',
	LOGIN = '/login',
	SIGN_UP = '/sign-up',
	DASHBOARD = '/dashboard',
	TODO_$ID = '/todo/:todoId',
	PROFILE = '/profile',
	RESET_PASSWORD = '/reset-password-request',
	RESET_PASSWORD_CONFIRM = '/reset-password',
	VERIFY_EMAIL = '/verify',
	ANY_PAGE = '*',
}

export const STORAGE_KEYS = Object.freeze({
	APP_STORAGE: 'APP_STORAGE',
	STATE: 'STATE',
	TOKEN: 'TOKEN',
	IS_AUTHORIZED: 'IS_AUTHORIZED',
	USER_ID: 'USER_ID',
});

export const API_KEYS = {
	TODOS_ROOT: 'todos/',
	TODOS_ALL: 'todos/all/',
	USER_ROOT: 'user/',
	USERS_ALL: 'user/all',
	LOGIN: 'user/login',
	REGISTER: 'user/register',
	RESET_PASSWORD: 'user/reset-password',
	VERIFY_URL: 'user/verify',
	RESET_PASSWORD_REQUEST: 'user/reset-password-request',
};

export const API_PARAM_KEYS = {
	SEARCH: 'search=',
	STATUS: 'status=',
	PAGE: 'page=',
	PER_PAGE: 'perPage=',
	USER_ID: 'userId=',
	EMAIL: 'email=',
	TOKEN: 'token=',
	PASSWORD: 'password=',
};
