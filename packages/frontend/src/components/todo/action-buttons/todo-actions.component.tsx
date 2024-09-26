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
					onChange={async () => {
						const newTodo = await todoService.updateTodo(todo?.id, {
							isCompleted: !todo?.isCompleted,
						});
						if (newTodo) {
							changeTodoState(newTodo);
						}
					}}
				/>
				<Blueprint.Button
					className={moderate}
					icon={<Draw size={16} />}
					onClick={onTodoChange}
					disabled={!isAuthorized}
				/>
			</div>
		</div>
	);
};
export { TodoActions };
