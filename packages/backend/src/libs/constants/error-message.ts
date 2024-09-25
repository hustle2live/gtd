const ErrorMessage = {
	MISSED_ID: 'Id is required',
	VERIFICATION_TOKEN_ERROR: 'Verification via email is not confirmed by User',
	LOGIN_FAILED: 'Invalid email or password',
	REGISTRATION_FAILED: 'Error while registering user',
	BODY_INVALID: 'Request arguments are invalid',
	EMAIL_EXIST: 'Email already exist',
	EMAIL_INVALID: 'Invalid email',
	PASSWORD_INVALID: 'Invalid password',
	NOT_FOUND: 'Requested data can not be found',
	UNKNOWN: 'Error. Something went wrong',
} as const;

export { ErrorMessage };
