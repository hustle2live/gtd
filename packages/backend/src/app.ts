import express, { Express } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';

import AppRouter from './routes';

const port = process.env.PORT || 3030;

const allowAllConnections = process.env.ALLOW_ALL_CORS || false;

const app: Express = express();

const router = new AppRouter(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (allowAllConnections) {
	app.use(
		cors({
			origin: '*',
			methods: ['POST', 'GET', 'PUT', 'DELETE'],
			allowedHeaders: ['Content-type', 'Authorization'],
		}),
	);
}

router.init();

app.listen(port, () => {
	console.log(
		`Server is listening on port ${port} , \n _allow all* CORS: ${allowAllConnections}`,
	);
});
