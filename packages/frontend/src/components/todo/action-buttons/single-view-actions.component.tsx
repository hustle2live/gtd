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
	actionLabel,
} from '../single-view/single-view.styles';
import { todosStore } from '~store/todos.store';
import { flexBetween } from '~/components/root-page/root.styles';

interface IActionProps {
	todo: ITodoType;
	isCompleted: boolean;
	isAuthorized?: boolean;
	isPublic: boolean;
	onTodoChange?: () => void;
	onComplete?: () => void;
	isMobile?: boolean;
}

const SingleViewActions: React.FunctionComponent<IActionProps> = ({
	isCompleted,
	isPublic,
	onTodoChange,
	isAuthorized = false,
	todo,
}: IActionProps): JSX.Element => {
	const navigate = useNavigate();
	const changeTodoState = todosStore(({ updateTodo }) => updateTodo);

	return (
		<div className={stylesWrapper}>
			<div className={switchGroup}>
				<Blueprint.Label className={actionLabel}>
					Complete
				</Blueprint.Label>
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
			</div>
			<div className={switchGroup}>
				<Blueprint.Label className={actionLabel}>
					Private
				</Blueprint.Label>
				<Blueprint.Switch
					className={switchElem}
					width={40}
					height={40}
					checked={!isPublic}
					disabled={!isAuthorized}
					onChange={async () => {
						const newTodo = await todoService.updateTodo(todo?.id, {
							isPublic: !todo?.isPublic,
						});
						if (newTodo) {
							changeTodoState(newTodo);
						}
					}}
				/>
			</div>
			<Blueprint.Button
				className={moderate}
				icon={<Draw size={16} />}
				onClick={onTodoChange}
				disabled={!isAuthorized}
			/>
		</div>
	);
};
export { SingleViewActions };
