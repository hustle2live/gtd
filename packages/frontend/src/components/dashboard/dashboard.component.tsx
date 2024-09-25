import React from 'react';
import { todosStore } from '~store/todos.store';
import { TodoContainer } from '../todo/todo-container.component';
import { FilterType } from '~shared/types/filters/filters-type';
import { Header } from '../header/header.component';
import { flexCenter, flexColumn } from '../root-page/root.styles';

type Props = {
	getTodosHandler: (filters?: FilterType) => Promise<void>;
};

const Dashboard: React.FunctionComponent<Props> = ({
	getTodosHandler,
}: Props): JSX.Element => {
	const myTodos = todosStore(({ todos }) => todos);

	return (
		<div className={`${flexColumn} ${flexCenter}`}>
			<Header />
			<TodoContainer data={myTodos} fetchTodos={getTodosHandler} />;
		</div>
	);
};

export { Dashboard };
