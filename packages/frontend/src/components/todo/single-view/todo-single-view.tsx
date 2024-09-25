import { Button, Intent } from '@blueprintjs/core';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';
import { ITodosStore, todosStore } from '~store/todos.store';
import { TodoViewElement } from './todo-view.component';
import { mg20, mw85 } from '../todo.styles';

const TodoSingleView: React.FunctionComponent = (): JSX.Element => {
	const { todoId } = useParams();
	const navigate = useNavigate();
	const store = todosStore((state: ITodosStore) => state.todos);
	const userId = todosStore((state: ITodosStore) => state.userId);

	const todoById = store.find((item) => item.id === Number(todoId));

	if (!userId || !todoById) {
		return <></>;
	}

	return (
		<div className={mg20}>
			<TodoViewElement
				todo={todoById}
				editable={todoById.userId === userId}
			/>
			<div className={mw85}>
				<Button
					text="Back"
					intent={Intent.WARNING}
					onClick={() => navigate(ROUTER_KEYS.DASHBOARD)}
				/>
			</div>
		</div>
	);
};

export { TodoSingleView };
