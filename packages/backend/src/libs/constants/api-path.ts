const ApiPATH = {
	ALL: '/all',
	ALL_PUBLIC: '/public',
	ROOT: '/',
	_ID: '/:id',
	REGISTER: '/register',
	LOGIN: '/login',
	EMAIL_CONFIRMATION: '/verify',
	PASSWORD_RESET: '/reset-password',
	PASSWORD_RESET_REQUEST: '/reset-password-request',
} as const;

export { ApiPATH };
