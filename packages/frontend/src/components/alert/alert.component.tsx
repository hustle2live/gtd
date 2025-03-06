import React, { FunctionComponent, useEffect, useState } from 'react';

import { alert, closebtn, hidden } from './alert.styles';

import { todosStore } from '~store/todos.store';

type AlertProps = {
	isShown?: boolean;
	text?: string | JSX.Element;
	onClick?: (item: unknown) => void;
};

const requestDelayTimer = 'Please, wait until Server Wake Up';

const AlertComponent: FunctionComponent<AlertProps> = (): JSX.Element => {
	const serverIsConnected = todosStore((state) => state.serverConection);
	const { isError, errorMessage, setError } = todosStore(
		({ isError, errorMessage, setError }) => {
			return { isError, errorMessage, setError };
		},
	);

	const [isHidden, setIsHidden] = useState<boolean>(!isError);
	const [timer, setTimer] = useState(59);
	const [dot, setDot] = useState(3);
	const [initialConnect, setInitialConnect] = useState(true);

	useEffect(() => {
		if (serverIsConnected) {
			setTimer(-1);
		}

		const myInterval = setInterval(() => {
			if (timer === 0) {
				setTimer(0);
				setDot(dot === 3 ? 1 : dot + 1);
			} else {
				setTimer(timer - 1);
			}
		}, 1000);

		if (timer === -1) {
			clearInterval(myInterval);
		}

		return () => clearInterval(myInterval);
	}, [timer, dot]);

	useEffect(() => {
		if (isError) {
			setIsHidden(false);
		} else {
			setIsHidden(true);
		}
	}, [isError]);

	useEffect(() => {
		if (!serverIsConnected) {
			setError(requestDelayTimer);
		}
	}, []);

	return (
		<div className={`${alert} ${isHidden && hidden}`}>
			<div>
				{errorMessage}
				{initialConnect && (
					<h3>
						{timer >= 0 ? (
							<span className="timer">
								{timer} sec {'.'.repeat(dot)}
							</span>
						) : (
							'Ready!'
						)}
					</h3>
				)}
			</div>

			<button
				className={`${closebtn} ${!serverIsConnected && hidden}`}
				disabled={!serverIsConnected}
				onClick={() => {
					setInitialConnect(false);
					setError();
				}}
			>
				&times;
			</button>
		</div>
	);
};

export { AlertComponent };
