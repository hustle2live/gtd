import React, { useState } from 'react';
import { ITodoType } from '~shared/types/todo/todo.types';
import { Button } from '@blueprintjs/core';

import { TodoActions } from '../action-buttons/todo-actions.component';
import { todoService } from '~/api/services/todo.service';
import * as styles from '../single-view/todo-view.styles';
import { ArrowLeft, ArrowRight } from '@blueprintjs/icons';
import {
	sliderWrapper,
	ulListWrapper,
	todoItemDiv,
	sliderButtons,
	buttonRight,
} from './todo-slider.styles';

type TProps = {
	data: ITodoType[];
	userId?: number;
	setEditTodoHandler: (id: number | null) => void;
};

const TodoSlider: React.FunctionComponent<TProps> = ({
	data,
	userId,
	setEditTodoHandler,
}): JSX.Element => {
	const cardWidth = 400;
	const gap = 40;

	const min = cardWidth / 2 - gap * 2;
	const max = -(data.length * (cardWidth - gap / 2));

	const [posX, setPosX] = useState(min);

	const changePosition = (forward = false): void => {
		let next = forward
			? Number(posX - (cardWidth + gap))
			: Number(posX + (cardWidth + gap));

		next = next > min ? max : next < max ? min : next;
		setPosX(next);
	};

	return (
		<div className={sliderWrapper}>
			<Button
				className={sliderButtons}
				icon={<ArrowLeft />}
				onClick={() => changePosition(false)}
			/>
			<Button
				className={buttonRight}
				icon={<ArrowRight />}
				onClick={() => changePosition(true)}
			/>

			<ul className={ulListWrapper(posX, gap)}>
				{data.map((todoItem) => (
					<li key={todoItem.id}>
						<div className={styles.wrapper && todoItemDiv}>
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
									isAuthorized={todoItem.userId === userId}
									setEditTodoHandler={setEditTodoHandler}
								/>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export { TodoSlider };
