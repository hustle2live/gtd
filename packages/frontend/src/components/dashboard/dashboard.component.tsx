import React, { useState } from 'react';
import { todosStore } from '~store/todos.store';
import { TodoContainer } from '../todo/todo-container.component';
import { FilterType } from '~shared/types/filters/filters-type';
import { Header } from '../header/header.component';
import { showEditWrapper } from '../add-todo/add-todo.controller';
import { Button, Intent } from '@blueprintjs/core';
import * as BPIcons from '@blueprintjs/icons';
import { addTodoButton, dashboardWrapper } from './dashboard.styles';
import Loader from '../loader/loader.component';
import { BackgroundWorkspace } from '../background/background';

type LoadProps = {
	isLoading: boolean;
};

type Props = {
	getTodosHandler: (filters?: FilterType) => Promise<void>;
} & LoadProps;

const Dashboard: React.FunctionComponent<Props> = ({
	getTodosHandler,
	isLoading,
}: Props): JSX.Element => {
	const myTodos = todosStore(({ todos }) => todos);

	const [editTodoId, setEditTodoId] = useState<number | null>(null);

	return (
		<div className={dashboardWrapper}>
			{isLoading && <Loader centered={true} />}
			<BackgroundWorkspace />
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
