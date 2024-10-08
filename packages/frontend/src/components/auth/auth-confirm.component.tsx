import React, { useEffect, useState } from 'react';

import { NavLink, useSearchParams } from 'react-router-dom';
import { userService } from '~/api/services/user.service';
import { ROUTER_KEYS } from '~shared/keys';
import { absoluteLeft, authDivWrapper, underline } from './auth.styles';

const AuthConfirmPage: React.FunctionComponent = () => {
	const [searchParams] = useSearchParams();
	const [message, setMessage] = useState(null);

	useEffect(() => {
		const handlePasswordReset = async (): Promise<void> => {
			const request = await userService.verificationConfirm({
				email: searchParams.get('email'),
				token: searchParams.get('token'),
			});

			setMessage(request?.message ?? null);
		};

		handlePasswordReset();
	}, []);

	return (
		<div className={authDivWrapper}>
			<NavLink className={absoluteLeft} to={ROUTER_KEYS.ROOT}>
				{'<--'} Return to main page
			</NavLink>
			<p>{message || <span>Confirmation request failed</span>}, </p>
			<NavLink className={underline} to={ROUTER_KEYS.LOGIN}>
				<span>Follow to login Page</span>
			</NavLink>
		</div>
	);
};

export { AuthConfirmPage };
