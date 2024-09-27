import React, { useState } from 'react';
import { todosStore } from '~store/todos.store';
import { TodoContainer } from '../todo/todo-container.component';
import { FilterType } from '~shared/types/filters/filters-type';
import { Header } from '../header/header.component';
import { flexCenter, flexColumn } from '../root-page/root.styles';
import { showEditWrapper } from '../add-todo/add-todo.controller';
import { Button, Intent } from '@blueprintjs/core';
import * as BPIcons from '@blueprintjs/icons';
import { addTodoButton } from './dashboard.styles';

type Props = {
	getTodosHandler: (filters?: FilterType) => Promise<void>;
};

const Dashboard: React.FunctionComponent<Props> = ({
	getTodosHandler,
}: Props): JSX.Element => {
	const myTodos = todosStore(({ todos }) => todos);
	const [editTodoId, setEditTodoId] = useState<number | null>(null);

	return (
		<div className={`${flexColumn} ${flexCenter}`}>
			<Header />
			<TodoContainer data={myTodos} fetchTodos={getTodosHandler} />;
			<Button
				className={addTodoButton}
				intent={Intent.PRIMARY}
				icon={<BPIcons.Plus size={34} />}
				onClick={() => setEditTodoId(999)}
			/>
			{showEditWrapper(editTodoId, setEditTodoId, true)}
		</div>
	);
};

export { Dashboard };
