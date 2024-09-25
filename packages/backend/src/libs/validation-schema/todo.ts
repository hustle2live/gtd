import joi from 'joi';

const todoValidationSchema = {
	create: joi.object({
		title: joi.string().max(50).required(),
		text: joi.string().max(500).default(''),
		isCompleted: joi.boolean().default(false),
		isPublic: joi.boolean().default(false),
	}),

	update: joi.object({
		title: joi.string().max(50),
		text: joi.string().max(500),
		isCompleted: joi.boolean(),
		isPublic: joi.boolean(),
	}),
};

export { todoValidationSchema };
