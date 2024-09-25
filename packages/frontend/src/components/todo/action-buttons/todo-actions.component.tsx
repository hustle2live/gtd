import React from 'react';

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

interface IActionProps {
	todo: ITodoType;
	isCompleted: boolean;
	isAuthorized?: boolean;
	isPublic?: boolean;
	onTodoChange?: () => void;
	onComplete?: () => void;
	isMobile?: boolean;
}

const TodoActions: React.FunctionComponent<IActionProps> = ({
	isCompleted,
	onTodoChange,
	isAuthorized = false,
	todo,
}: IActionProps): JSX.Element => {
	const navigate = useNavigate();

	const changeTodoState = todosStore(({ updateTodo }) => updateTodo);

	return (
		<div className={stylesWrapper}>
			<Blueprint.Button
				className={stylesButton}
				text={'View'}
				onClick={() => navigate(`/todo/${todo?.id}`)}
				disabled={!isAuthorized}
			/>
			<Blueprint.Button
				className={stylesButton}
				text={'Delete'}
				onClick={() => todoService.deleteTodo(todo?.id)}
				disabled={!isAuthorized}
			/>
			<div className={switchGroup}>
				<Blueprint.Switch
					className={switchElem}
					width={40}
					height={40}
					checked={isCompleted}
					onChange={async () => {
						const newTodo = await todoService.updateTodo(todo?.id, {
							isCompleted: !todo?.isCompleted,
						});
						if (newTodo) {
							changeTodoState(newTodo);
						}
					}}
					disabled={!isAuthorized}
				/>
				<Blueprint.Button
					className={moderate}
					disabled={!isAuthorized}
					onClick={onTodoChange}
					icon={<Draw size={16} />}
				/>
			</div>
		</div>
	);
};
export { TodoActions };
