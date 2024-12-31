import React, { FunctionComponent, useEffect, useState } from 'react';

import { alert, closebtn, hidden } from './alert.styles';

import { todosStore } from '~store/todos.store';

type AlertProps = {
	isShown?: boolean;
	text?: string | JSX.Element;
	onClick?: (item: unknown) => void;
};

const requestDelayMessage = (
	<>
		<p>
			Hi and wellcome<span className="emoji">👋 </span>, <br />{' '}
			Login/register requests <b>can be delayed by 50-60</b> seconds.
		</p>
		<p>
			Free Backend Web Service spins down with inactivity. Sorry for that{' '}
			<span className="emoji">🙄</span>.
		</p>
	</>
);
const requestDelayTimer = (
	<h4>
		Hi<span className="emoji">👋 </span>
		Please,
		<br />
		wait for the server's Woke Up :
	</h4>
);

const AlertComponent: FunctionComponent<AlertProps> = (): JSX.Element => {
	const serverIsConnected = todosStore((state) => state.serverConection);
	const [isHidden, setIsHidden] = useState<boolean>(serverIsConnected);

	const [timer, setTimer] = useState(59);
	const [dot, setDot] = useState(3);

	console.log('serverIsConnected ... ' + serverIsConnected);

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

	return (
		<div className={`${alert} ${isHidden && hidden}`}>
			<div>
				{requestDelayTimer}
				<h3>
					{timer >= 0 ? (
						<span className="timer">
							{timer} sec {'.'.repeat(dot)}
						</span>
					) : (
						'Connected!'
					)}
				</h3>
			</div>

			<button
				className={`${closebtn} ${!serverIsConnected && hidden}`}
				disabled={!serverIsConnected}
				onClick={() => setIsHidden(true)}
			>
				&times;
			</button>
		</div>
	);
};

export { AlertComponent };
