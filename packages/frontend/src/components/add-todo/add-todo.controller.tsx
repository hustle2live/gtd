import React from 'react';
import { EditTodoWrapper } from './add-todo.component';

export const showEditWrapper = (
	id: number | null,
	handler: (id: number | null) => void,
	create: boolean = false,
): JSX.Element => {
	return !id ? (
		<></>
	) : (
		<EditTodoWrapper
			createNew={create}
			editTodoId={id}
			setEditTodoHandler={handler}
		/>
	);
};
