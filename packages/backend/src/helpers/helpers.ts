const regexPhone = /^\+?3?8?(0\d{9})$/;

const regexEmail = /^[^@]+@[^@]+\.[^@]+$/;

const extractBearerToken = (
	authHeaderString: string | undefined,
): string | null => {
	if (!authHeaderString || !authHeaderString.startsWith('Bearer ')) {
		return null;
	}
	return authHeaderString.split(' ')[1] ?? null;
};

export { regexPhone, regexEmail, extractBearerToken };
