import React, { useEffect, useState } from 'react';
import {
	Button,
	Card,
	Elevation,
	InputGroup,
	TextArea,
} from '@blueprintjs/core';

import {
	buttonGroup,
	cardStyles,
	editContainer,
	inputStyles,
	wrapperStyles,
} from './add-todo.styles';

import { flexCenter, flexColumn } from '../root-page/root.styles';

import { ITodoType } from '~shared/types/todo/todo.types';
import { todoService } from '~/api/services/todo.service';
import { todosStore } from '~store/todos.store';

type Props = {
	createNew?: boolean;
	editTodoId: number | null;
	setEditTodoHandler: (id: number | null) => void;
};

const EditTodoWrapper = ({
	createNew = false,
	editTodoId = null,
	setEditTodoHandler,
}: Props): JSX.Element => {
	const todo: ITodoType | undefined = todosStore(({ todos }) =>
		todos.find((todo) => todo.id === editTodoId),
	);

	const { title, text } = todo ?? { title: '', text: '' };

	const [todoTitle, setTodoTitle] = useState(title);
	const [todoText, setTodoText] = useState(text);

	const { userId, id } = todo;
	const { createTodo, updateTodo } = todoService;

	const [action, actionId] = createNew
		? [createTodo.bind(todoService), userId]
		: [updateTodo.bind(todoService), id];

	const handleEditTodo = async (): Promise<void> => {
		if (confirm('Are you sure to save changes ?')) {
			await action(actionId, {
				title: todoTitle,
				text: todoText,
			});
			setEditTodoHandler(null);
		}
	};

	return (
		<div
			hidden={!editTodoId}
			className={`${flexColumn} ${flexCenter} ${editContainer}`}
		>
			<Card
				className={wrapperStyles}
				interactive={true}
				elevation={Elevation.TWO}
			>
				<h4>
					{todo ? 'Edit ' : 'Create new '} <span>Todo Task</span>
				</h4>

				<Card
					className={cardStyles}
					interactive={false}
					elevation={Elevation.ZERO}
				>
					<h5>Title: </h5>
					<InputGroup
						className={inputStyles}
						value={todoTitle}
						onChange={(e) => setTodoTitle(e.target.value)}
					/>

					<h5>Description: </h5>
					<TextArea
						className={inputStyles}
						value={todoText}
						onChange={(e) => setTodoText(e.target.value)}
					/>
				</Card>

				<div className={buttonGroup}>
					<Button onClick={() => setEditTodoHandler(null)}>
						Cancel
					</Button>

					<Button
						onClick={async () => {
							await handleEditTodo();
						}}
					>
						{todo ? 'Save Todo ' : 'Add Todo '}
					</Button>
				</div>
			</Card>
		</div>
	);
};

export { EditTodoWrapper };
