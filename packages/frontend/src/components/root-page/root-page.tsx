import React from 'react';
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

const RootPage: React.FunctionComponent = (): JSX.Element => {
	const navigate = useNavigate();

	return (
		<div className={rootWrapper}>
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
