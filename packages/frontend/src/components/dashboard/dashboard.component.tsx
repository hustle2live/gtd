import React, { useEffect, useState } from 'react';
import { ITodoType } from '~shared/types/todo/todo.types';
import { todosStore } from '~store/todos.store';
import { TodoContainer } from '../todo/todo-container.component';
import { FilterType } from '~shared/types/filters/filters-type';

type Props = {
	getTodosHandler: (filters?: FilterType) => Promise<void>;
};

const Dashboard: React.FunctionComponent<Props> = ({
	getTodosHandler,
}: Props): JSX.Element => {
	const myTodos = todosStore(({ todos }) => todos);
	const [todos, setTodos] = useState<ITodoType[]>(myTodos);

	useEffect(() => {
		setTodos(myTodos);
	}, [myTodos]);

	return <TodoContainer data={todos} fetchTodos={getTodosHandler} />;
};

export { Dashboard };
