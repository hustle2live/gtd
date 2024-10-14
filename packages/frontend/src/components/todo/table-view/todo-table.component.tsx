import React, { useEffect, useState } from 'react';
import { Table2, Column, Cell } from '@blueprintjs/table';

import { todoService } from '~/api/services/todo.service';
import { ITodoType } from '~shared/types/todo/todo.types';
import { TodoActions } from '../action-buttons/todo-actions.component';

import Pagination from '../pagination/todo-pagination.component';

import { useMediaQuery } from 'react-responsive';
import { ScreenParams } from '~shared/constants/screen-queries';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/table/lib/css/table.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import { tableStyles } from '../todo.styles';
import { getColumnSize } from '~shared/constants/table-sizes';

type Props = {
	todosData: ITodoType[];
	userId: number;
	pageNumber: number;
	handlePageNumber: (x: number) => void;
	handleItemsPerPage: (x: number) => void;
	setEditTodoHandler: (id: number | null) => void;
};

const TodoTable: React.FunctionComponent<Props> = ({
	todosData,
	userId,
	pageNumber,
	handlePageNumber,
	handleItemsPerPage,
	setEditTodoHandler,
}: Props) => {
	const [todos, setTodos] = useState(todosData);

	const initialRowsCount = 10;
	const SCREEN_SIZES = {
		M: useMediaQuery(ScreenParams.DesktopM),
		L: useMediaQuery(ScreenParams.DesktopL),
		XL: useMediaQuery(ScreenParams.DesktopXL),
		XXL: useMediaQuery(ScreenParams.Desktop4K),
	};

	const PaginationComponent = new Pagination({
		totalCount: 3,
		current: pageNumber,
		onPaginate: handlePageNumber,
	});

	useEffect(() => {
		handleItemsPerPage(initialRowsCount);
	}, []);

	useEffect(() => {
		setTodos(todosData);
	}, [todosData]);

	const BlueprintTable = (): JSX.Element => (
		<Table2
			className={tableStyles}
			numRows={initialRowsCount}
			columnWidths={getColumnSize(SCREEN_SIZES)}
			defaultRowHeight={40}
			cellRendererDependencies={todos}
			enableFocusedCell={true}
		>
			<Column
				name="Title"
				cellRenderer={(rowIndex) => (
					<Cell>
						{rowIndex >= todos.length ? '' : todos[rowIndex]?.title}
					</Cell>
				)}
			/>

			<Column
				name="Description"
				cellRenderer={(rowIndex) => (
					<Cell>
						{rowIndex >= todos.length ? '' : todos[rowIndex]?.text}
					</Cell>
				)}
			/>

			<Column
				name="Completed"
				cellRenderer={(rowIndex) => (
					<Cell>
						{rowIndex >= todos.length ? (
							''
						) : (
							<TodoActions
								todo={todos[rowIndex]}
								isCompleted={todos[rowIndex]?.isCompleted}
								isAuthorized={
									todos[rowIndex]?.userId === userId
								}
								onComplete={() => {
									const todoItem = todos[rowIndex];
									todoService.updateTodo(todoItem?.id, {
										isCompleted: !todoItem?.isCompleted,
									});
								}}
								setEditTodoHandler={setEditTodoHandler}
							/>
						)}
					</Cell>
				)}
			/>
		</Table2>
	);

	return (
		<div>
			<BlueprintTable />
			{PaginationComponent.render()}
		</div>
	);
};

export default TodoTable;
