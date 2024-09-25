import * as React from 'react';
import { ITodoType } from '~shared/types/todo/todo.types';
import { TodoViewElement } from '../single-view/todo-view.component';

import { mockStyles } from '../todo.styles';

type TProps = {
	data: ITodoType[];
	userId: number;
	horizontal?: boolean;
};

const TodoListElement: React.FunctionComponent<TProps> = ({
	data,
	userId,
	horizontal = false,
}): JSX.Element => {
	return (
		<div className={mockStyles(horizontal).listWrapper}>
			<ul className={mockStyles(horizontal).ulStyles}>
				{data.map((item) => (
					<li key={item.id}>
						<TodoViewElement
							todo={item}
							editable={item.userId === userId}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export { TodoListElement };
