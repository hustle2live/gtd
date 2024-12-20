import { Application } from 'express';

import todosRouter from './api/todos.route';
import userRouter from './api/user.route';

class AppRouter {
	constructor(private app: Application) {}

	init(): void {
		this.app.get('/api', (_req, res) => {
			res.send('API Running');
		});
		this.app.use('/api/todos', todosRouter);
		this.app.use('/api/user', userRouter);
	}
}

export default AppRouter;
