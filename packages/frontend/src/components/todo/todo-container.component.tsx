import React, { useEffect, useState } from 'react';
import TodoTable from './table-view/todo-table.component';

import { ITodoType } from '~shared/types/todo/todo.types';
import { InputGroup, Tab, Tabs } from '@blueprintjs/core';
import { Search } from '@blueprintjs/icons';

import { todosStore } from '~store/todos.store';
import { TodoListElement } from './list-view/todo-list.component';
import {
	stylesDefault,
	stylesMobile,
	tabButton,
	tabsContainer,
} from './todo.styles';
import { TodoSlider } from './slider-view/todo-slider.component';
import { FilterType } from '~shared/types/filters/filters-type';
import { useMediaQuery } from 'react-responsive';
import { ScreenParams } from '~shared/constants/screen-queries';
import { showEditWrapper } from '../add-todo/add-todo.controller';

enum TABS {
	ALL = 'all',
	PRIVATE = 'private',
	PUBLIC = 'public',
	COMPLETED = 'completed',
}

type Props = {
	data: ITodoType[];
	fetchTodos: (filters?: FilterType) => Promise<void>;
};

export const TodoContainer: React.FunctionComponent<Props> = ({
	data,
	fetchTodos,
}: Props) => {
	const currentUser = todosStore((state) => state.userId);
	const [tabSelected, setTabSelected] = useState<TABS>(TABS.ALL);
	const [search, setSearch] = useState('');
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(10);
	const [editTodoId, setEditTodoId] = useState<number | null>(null);

	const isMobile = useMediaQuery(ScreenParams.Mobile);
	const isTablet = useMediaQuery(ScreenParams.Tablet);
	const isDesktop = useMediaQuery(ScreenParams.Desktop);

	const filters: FilterType = {
		status: tabSelected === TABS.ALL ? null : tabSelected,
		search: search,
		page: pageNumber,
		perPage: itemsPerPage,
	};

	const handleTabsSelector = (): void => {
		fetchTodos(filters);
	};

	const handleSearch = (value = search): (() => void) => {
		const timeoutId = setTimeout(() => {
			filters.search = value;
			handleTabsSelector();
		}, 1300);

		return () => clearTimeout(timeoutId);
	};

	const TodosScreenResponsive = (): JSX.Element => {
		switch (true) {
			case isMobile:
				return (
					<TodoListElement
						data={data}
						userId={currentUser}
						setEditTodoHandler={setEditTodoId}
					/>
				);
			case isTablet:
				return (
					<TodoSlider
						data={data}
						userId={currentUser}
						setEditTodoHandler={setEditTodoId}
					/>
				);
			case isDesktop:
				return (
					<TodoTable
						setEditTodoHandler={setEditTodoId}
						todosData={data}
						userId={currentUser}
						pageNumber={pageNumber}
						handlePageNumber={setPageNumber}
						handleItemsPerPage={setItemsPerPage}
					/>
				);
		}
	};

	const TodoTabBar = (): JSX.Element => {
		return (
			<Tabs
				id="TabsExample"
				selectedTabId={tabSelected}
				className={tabsContainer}
				onChange={(TabId: TABS) => setTabSelected(TabId)}
			>
				<Tab className={tabButton} id={TABS.ALL} title={TABS.ALL} />
				<Tab
					className={tabButton}
					id={TABS.PRIVATE}
					title={TABS.PRIVATE}
				/>
				<Tab
					className={tabButton}
					id={TABS.PUBLIC}
					title={TABS.PUBLIC}
				/>
				<Tab
					className={tabButton}
					id={TABS.COMPLETED}
					title={TABS.COMPLETED}
				/>
			</Tabs>
		);
	};

	useEffect(() => {
		const filters: FilterType = {
			status: tabSelected === TABS.ALL ? null : tabSelected,
			search: search,
			page: pageNumber,
			perPage: itemsPerPage,
		};

		fetchTodos(filters);
	}, [tabSelected, pageNumber]);

	useEffect(handleSearch, [search]);

	return (
		<div
			className={isMobile ? stylesMobile.wrapper : stylesDefault.wrapper}
		>
			{showEditWrapper(editTodoId, setEditTodoId)}

			<div className={isMobile ? stylesMobile.tabs : stylesDefault.tabs}>
				<TodoTabBar />
				<div className="bp5-input-group">
					<InputGroup
						leftIcon={
							<Search
								className="search-icon"
								onClick={handleTabsSelector}
							/>
						}
						id="search"
						type="text"
						placeholder="search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>

					<button
						onClick={() => setSearch('')}
						className="bp5-button bp5-minimal"
					>
						[x]
					</button>
				</div>
			</div>
			<div className={isMobile ? stylesMobile.list : ''}>
				<TodosScreenResponsive />
			</div>
		</div>
	);
};
