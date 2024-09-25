import React from 'react';
import * as Blueprint from '@blueprintjs/core';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';
import { buttonAddition } from '../root-page/root.styles';

export const DashboardLink: React.FunctionComponent = (): JSX.Element => {
	const navigate = useNavigate();
	return (
		<Blueprint.Button
			outlined
			className={buttonAddition}
			text={'-- > to dash board'}
			intent={Blueprint.Intent.PRIMARY}
			onClick={() => navigate(ROUTER_KEYS.DASHBOARD)}
		/>
	);
};
