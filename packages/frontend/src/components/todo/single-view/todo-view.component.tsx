import React, { useState } from 'react';
import * as styles from './todo-view.styles';

import { TodoActions } from '../action-buttons/todo-actions.component';
import { todoService } from '~/api/services/todo.service';
import { ITodoType } from '~shared/types/todo/todo.types';

type ITodoProps = {
	todo: ITodoType;
	editable: boolean;
};

const TodoViewElement: React.FunctionComponent<ITodoProps> = ({
	todo,
	editable,
}: ITodoProps) => {
	const todoItem = todo;

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>{todoItem.title}</div>
			<div className={styles.description}>
				<p className="heading">Description:</p>
				<p className="text">{todoItem.text}</p>
			</div>
			<div>
				<TodoActions
					todo={todoItem}
					onComplete={() => {
						todoService.updateTodo(todoItem.id, {
							isCompleted: !todoItem.isCompleted,
						});
					}}
					isCompleted={todoItem.isCompleted}
					isAuthorized={editable}
				/>
			</div>
		</div>
	);
};

export { TodoViewElement };
