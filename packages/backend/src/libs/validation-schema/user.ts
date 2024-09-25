import { regexEmail } from '@/helpers/helpers';
import joi from 'joi';

const userValidationSchema = {
	create: joi.object({
		email: joi.string().max(100).pattern(regexEmail).required(),
		password: joi.string().required(),
		name: joi.string().max(50).default(''),
	}),

	update: joi.object({
		email: joi.string().max(100).pattern(regexEmail),
		password: joi.string(),
		name: joi.string().max(50),
	}),
};

export { userValidationSchema };
