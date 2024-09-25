import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
	service: 'ukr.net',
	host: 'smtp.ukr.net',
	pool: true,
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL_AUTH_USERNAME,
		pass: process.env.EMAIL_AUTH_PASSWORD,
	},
});
