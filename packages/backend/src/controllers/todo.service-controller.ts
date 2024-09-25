import controller from './todo.controller';

const TodoActions = {
	getAllPublic: controller.getPublic.bind(controller),
	getAllUserTodos: controller.getUserTodos.bind(controller),
	getOne: controller.getById.bind(controller),
	create: controller.createTodo.bind(controller),
	update: controller.updateTodo.bind(controller),
	delete: controller.deleteTodo.bind(controller),
};

export { controller, TodoActions };
