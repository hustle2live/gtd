import React, { useEffect } from 'react';
import { Table2, Column, Cell, RenderMode } from '@blueprintjs/table';

import { todoService } from '~/api/services/todo.service';
import { ITodoType } from '~shared/types/todo/todo.types';
import { TodoActions } from '../action-buttons/todo-actions.component';

import Pagination from '../pagination/todo-pagination.component';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/table/lib/css/table.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import { paginationStyles, tableStyles } from '../todo.styles';

type Props = {
	todos: ITodoType[];
	userId: number;
	pageNumber: number;
	handlePageNumber: (x: number) => void;
	handleItemsPerPage: (x: number) => void;
};

const TodoTable: React.FunctionComponent<Props> = ({
	todos,
	userId,
	pageNumber,
	handlePageNumber,
	handleItemsPerPage,
}: Props) => {
	const initialRowsCount = 10;

	useEffect(() => {
		handleItemsPerPage(initialRowsCount);
	}, []);

	const PaginationComponent = new Pagination({
		totalCount: 3,
		current: pageNumber,
		onPaginate: handlePageNumber,
	});

	return (
		<div>
			<Table2
				className={tableStyles}
				numRows={initialRowsCount}
				columnWidths={[240, 450, 180]}
				defaultRowHeight={40}
				cellRendererDependencies={todos}
				enableFocusedCell={true}
				forceRerenderOnSelectionChange={true}
				enableColumnResizing={false}
				renderMode={RenderMode.BATCH}
			>
				<Column
					name="Title"
					cellRenderer={(rowIndex) => (
						<Cell>{todos[rowIndex]?.title ?? ''}</Cell>
					)}
				/>

				<Column
					name="Description"
					cellRenderer={(rowIndex) => (
						<Cell>{todos[rowIndex]?.text ?? ''}</Cell>
					)}
				/>

				<Column
					name="Completed"
					cellRenderer={(rowIndex) => (
						<Cell>
							{!todos[rowIndex] ? (
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
								/>
							)}
						</Cell>
					)}
				/>
			</Table2>
			<div className={paginationStyles}>
				{PaginationComponent.render()}
			</div>
		</div>
	);
};

export default TodoTable;
