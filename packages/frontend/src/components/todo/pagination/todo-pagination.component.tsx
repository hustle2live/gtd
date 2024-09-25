import React, { Component } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { ChevronBackward, ChevronForward } from '@blueprintjs/icons';

const CELL_COUNT = 7;
const CELL_MID_LEN = ~~(CELL_COUNT / 2);

type TProps = {
	onPaginate: (nr: number) => void;
	totalCount: number;
	current: number;
};

type TState = {
	current: number;
	totalCount: number;
};

type TPage = {
	nr?: number;
	ellipsis?: boolean;
	active?: boolean;
};

class Pagination extends Component {
	public paginate: (nr: number) => void;
	declare state: TState;

	constructor(props: TProps) {
		super(props);
		this.state = {
			totalCount: props.totalCount || 1,
			current: props.current || 1,
		};

		this.paginate = (nr: number): void => props.onPaginate(nr);
	}

	componentWillReceiveProps(props: TState): void {
		this.state = {
			totalCount: props.totalCount,
			current: props.current || 1,
		};
	}

	getPagingLayout(): TPage[] {
		const totalCount = this.state.totalCount,
			current = this.state.current;
		const pages = [] as TPage[];

		if (totalCount > CELL_COUNT) {

			pages[0] = { nr: 1 };
			pages[1] = { nr: 2 };
			pages[CELL_COUNT - 2] = { nr: totalCount - 1 };
			pages[CELL_COUNT - 1] = { nr: totalCount };

			if (current <= CELL_MID_LEN) {
				pages[CELL_COUNT - 2].ellipsis = true;
				for (let i = 2; i < CELL_COUNT - 2; i++) {
					pages[i] = { nr: i + 1 };
				}
			} else if (totalCount - current < CELL_MID_LEN) {
				pages[1].ellipsis = true;
				for (let i = 2; i < CELL_COUNT - 2; i++) {
					pages[i] = { nr: totalCount - CELL_COUNT + i + 1 };
				}
			} else {
				pages[1].ellipsis = true;
				pages[CELL_COUNT - 2].ellipsis = true;

				pages[CELL_MID_LEN] = { nr: current };
				for (let i = 1; i < CELL_COUNT - 5; i++) {
					pages[CELL_MID_LEN + i] = { nr: current + i };
					pages[CELL_MID_LEN - i] = { nr: current - i };
				}
			}
		} else {
			for (let i = 0; i < totalCount; i++) {
				pages[i] = { nr: i + 1, ellipsis: false };
			}
		}

		pages.forEach((p) => {
			if (p.nr === this.state.current) {
				p.active = true;
			}
		});

		return pages;
	}

	render(): JSX.Element {
		const ltEnable = this.state.current > 1;
		const rtEnable = this.state.current < this.state.totalCount;
		const pages = this.getPagingLayout();

		return (
			<div className="pt-button-group">
				<Button
					icon={<ChevronBackward />}
					disabled={!ltEnable}
					onClick={() => this.paginate(this.state.current - 1)}
				/>
				{pages.map((p) => (
					<Button
						text={p.ellipsis ? '...' : p.nr}
						key={p.nr}
						disabled={p.ellipsis}
						intent={p.active ? Intent.PRIMARY : Intent.NONE}
						onClick={() => this.paginate(p.nr)}
					/>
				))}
				<Button
					icon={<ChevronForward />}
					disabled={!rtEnable}
					onClick={() => this.paginate(this.state.current + 1)}
				/>
			</div>
		);
	}
}

export default Pagination;
