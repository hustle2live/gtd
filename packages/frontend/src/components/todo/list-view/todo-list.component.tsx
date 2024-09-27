import React from 'react';
import { ITodoType } from '~shared/types/todo/todo.types';
import { TodoViewElement } from '../single-view/todo-view.component';

import { mockStyles } from '../todo.styles';

type TProps = {
	data: ITodoType[];
	userId: number;
	setEditTodoHandler: (id: number | null) => void;
};

const TodoListElement: React.FunctionComponent<TProps> = ({
	data,
	userId,
	setEditTodoHandler,
}): JSX.Element => {
	return (
		<div className={mockStyles.listWrapper}>
			<ul className={mockStyles.ulStyles}>
				{data.map((item) => (
					<li key={item.id}>
						<TodoViewElement
							todo={item}
							editable={item.userId === userId}
							setEditTodoHandler={setEditTodoHandler}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export { TodoListElement };
