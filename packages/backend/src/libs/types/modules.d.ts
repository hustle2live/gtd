declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TEST: string;
			DATABASE_URL: string;
			BASE_URL: string;
			EMAIL_AUTH_USERNAME: string;
			EMAIL_AUTH_PASSWORD: string;
			SITE_URL: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
