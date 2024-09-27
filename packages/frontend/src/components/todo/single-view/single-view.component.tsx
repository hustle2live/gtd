import React, { useState } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';
import { ITodosStore, todosStore } from '~store/todos.store';
import { TodoViewElement } from './todo-view.component';
import { mw85 } from '../todo.styles';
import { buttonBack } from './todo-view.styles';
import { Header } from '~/components/header/header.component';
import { singleViewContainer } from './single-view.styles';
import { EditTodoWrapper } from '~/components/add-todo/add-todo.component';
import { showEditWrapper } from '~/components/add-todo/add-todo.controller';

const TodoSingleView: React.FunctionComponent = (): JSX.Element => {
	const { todoId } = useParams();
	const navigate = useNavigate();

	const [editTodoId, setEditTodoId] = useState<number | null>(null);

	const store = todosStore((state: ITodosStore) => state.todos);
	const userId = todosStore((state: ITodosStore) => state.userId);

	const todoById = store.find((item) => item.id === Number(todoId));

	if (!userId || !todoById) {
		return <></>;
	}

	// const showEditWrapper = (): JSX.Element => {
	// 	return !editTodoId ? (
	// 		<></>
	// 	) : (
	// 		<EditTodoWrapper
	// 			editTodoId={editTodoId}
	// 			setEditTodoHandler={setEditTodoId}
	// 		/>
	// 	);
	// };

	return (
		<>
			<Header />
			<div className={singleViewContainer}>
				<TodoViewElement
					todo={todoById}
					editable={todoById.userId === userId}
					singleview={true}
					setEditTodoHandler={setEditTodoId}
				/>
				<div className={mw85}>
					<Button
						className={buttonBack}
						text="Back"
						intent={Intent.WARNING}
						onClick={() => navigate(ROUTER_KEYS.DASHBOARD)}
					/>
				</div>
				{showEditWrapper(editTodoId, setEditTodoId)}
			</div>
		</>
	);
};

export { TodoSingleView };
