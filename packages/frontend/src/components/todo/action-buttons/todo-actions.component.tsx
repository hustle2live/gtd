import React, { useState } from 'react';

import * as Blueprint from '@blueprintjs/core';
import { ITodoType } from '~shared/types/todo/todo.types';
import { Draw } from '@blueprintjs/icons';
import { todoService } from '~/api/services/todo.service';
import { useNavigate } from 'react-router-dom';

import {
	stylesWrapper,
	stylesButton,
	switchGroup,
	switchElem,
	moderate,
} from './todo-actions.styles';
import { todosStore } from '~store/todos.store';
import { EditTodoWrapper } from '~/components/add-todo/add-todo.component';

interface IActionProps {
	todo: ITodoType;
	isCompleted: boolean;
	isAuthorized?: boolean;
	isPublic?: boolean;
	onTodoChange?: () => void;
	onComplete?: () => void;
	isMobile?: boolean;
	setEditTodoHandler: (id: number | null) => void;
}

const TodoActions: React.FunctionComponent<IActionProps> = ({
	isCompleted,
	isAuthorized = false,
	todo,
	setEditTodoHandler,
}: IActionProps): JSX.Element => {
	const navigate = useNavigate();

	const changeTodoState = todosStore(({ updateTodo }) => updateTodo);

	const handleTodoUpdate = async (todoData: Partial<ITodoType>) => {
		const newTodo = await todoService.updateTodo(todo.id, todoData);
		if (newTodo) {
			changeTodoState(newTodo);
		}
	};

	return (
		<div className={stylesWrapper}>
			<div>
				<Blueprint.Button
					className={stylesButton}
					text={'View'}
					onClick={() => navigate(`/todo/${todo?.id}`)}
					disabled={!isAuthorized}
				/>
				<Blueprint.Button
					className={stylesButton}
					text={'Delete'}
					disabled={!isAuthorized}
					onClick={() => {
						if (confirm('Are you want to delete todo ?'))
							todoService.deleteTodo(todo?.id);
					}}
				/>
			</div>
			<div className={switchGroup}>
				<Blueprint.Switch
					className={switchElem}
					width={40}
					height={40}
					checked={isCompleted}
					disabled={!isAuthorized}
					onChange={() =>
						handleTodoUpdate({
							isCompleted: !todo?.isCompleted,
						})
					}
				/>
				<Blueprint.Button
					className={moderate}
					icon={<Draw size={16} />}
					onClick={() => setEditTodoHandler(todo?.id)}
					disabled={!isAuthorized}
				/>
			</div>
		</div>
	);
};
export { TodoActions };
