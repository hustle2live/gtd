import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';

import AppRouter from './routes';

const port = process.env.PORT || 3030;

const app: Express = express();

const router = new AppRouter(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
	cors({
		origin: '*',
		methods: ['POST', 'GET', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-type', 'Authorization'],
	}),
);

app.get('/', (req: Request, res: Response) => {
	res.json({ message: 'Hello Node!' });
});

router.init();

app.listen(port, () => {
	console.log(`Now listening on port ${port}`);
});
