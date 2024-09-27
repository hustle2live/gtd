import React from 'react';
import * as styles from './todo-view.styles';

import { TodoActions } from '../action-buttons/todo-actions.component';
import { todoService } from '~/api/services/todo.service';
import { ITodoType } from '~shared/types/todo/todo.types';
import { SingleViewActions } from '../action-buttons/single-view-actions.component';

type ITodoProps = {
	todo: ITodoType;
	editable: boolean;
	singleview?: boolean;
	setEditTodoHandler: (id: number | null) => void;
};

const TodoViewElement: React.FunctionComponent<ITodoProps> = ({
	todo,
	editable,
	singleview = false,
	setEditTodoHandler = (): void => {},
}: ITodoProps) => {
	const todoItem = todo;
	const additionalStyles = singleview ? 'singleView' : '';

	return (
		<div className={`${styles.wrapper} ${additionalStyles}`}>
			<div className={`${styles.title} ${additionalStyles}`}>
				{todoItem.title}
			</div>
			<div className={`${styles.description} ${additionalStyles}`}>
				{singleview && <p className="heading">Description:</p>}
				<p className="text">{todoItem.text}</p>
			</div>
			<div>
				{singleview ? (
					<SingleViewActions
						todo={todoItem}
						isCompleted={todoItem.isCompleted}
						isPublic={todoItem.isPublic}
						isAuthorized={editable}
						setEditTodoHandler={setEditTodoHandler}
					/>
				) : (
					<TodoActions
						todo={todoItem}
						isCompleted={todoItem.isCompleted}
						isAuthorized={editable}
						setEditTodoHandler={setEditTodoHandler}
					/>
				)}
			</div>
		</div>
	);
};

export { TodoViewElement };
