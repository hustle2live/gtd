import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Blueprint from '@blueprintjs/core';
import { ROUTER_KEYS } from '~shared/keys';

import {
	buttonGroup,
	buttonStyles,
	navigationLink,
	rootWrapper,
} from './root.styles';
import { DashboardLink } from '../dashboard/dashboard-link.component';

import Loader from '../loader/loader.component';
import { BackgroundStripes } from '../background/background';
import { AlertComponent } from '../alert/alert.component';

type RootProps = {
	isLoading: boolean;
};

const RootPage: React.FunctionComponent<RootProps> = ({
	isLoading,
}: RootProps): JSX.Element => {
	const navigate = useNavigate();
	const [notify, setNotify] = useState(false);

	const requestDelayMessage = (
		<>
			<p>
				Hi and wellcome<span className="emoji">👋 </span>, <br />{' '}
				Login/register requests <b>can be delayed by 50-60</b> seconds.
			</p>
			<p>
				Free Backend Web Service spins down with inactivity. Sorry for
				that <span className="emoji">🙄</span>.
			</p>
		</>
	);

	useEffect(() => {
		setTimeout(() => {
			setNotify(true);
		}, 500);
	}, []);

	return (
		<div className={rootWrapper}>
			<BackgroundStripes />
			{isLoading && <Loader />}
			<AlertComponent isShown={notify} text={requestDelayMessage} />
			<DashboardLink />
			<div>
				<p>Getting Things Reactively Done, &#128640;</p>
				<h2>Your Personal Todo list</h2>
			</div>
			<div className={buttonGroup}>
				<Blueprint.Button
					text={'Login'}
					className={buttonStyles}
					intent={Blueprint.Intent.PRIMARY}
					onClick={() => navigate(ROUTER_KEYS.LOGIN)}
				/>

				<Blueprint.Button
					text={'Register'}
					className={buttonStyles}
					onClick={() => navigate(ROUTER_KEYS.SIGN_UP)}
				/>
			</div>
			<NavLink className={navigationLink} to={ROUTER_KEYS.RESET_PASSWORD}>
				Forget Password ?
			</NavLink>
		</div>
	);
};

export { RootPage };
