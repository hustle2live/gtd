import React, { useEffect, useState } from 'react';

import { NavLink, useSearchParams } from 'react-router-dom';
import { userService } from '~/api/services/user.service';
import { ROUTER_KEYS } from '~shared/keys';
import { absoluteLeft, authDivWrapper, underline } from './auth.styles';
import Loader from '../loader/loader.component';
import { AimpointsTarget } from '@blueprintjs/icons';
import { themeColors } from '~shared/styles';
import { headerMainLink } from '../header/header-main-link.styles';
import Button from '../button/button.component';

const AuthConfirmPage: React.FunctionComponent = () => {
	const [searchParams] = useSearchParams();
	const [message, setMessage] = useState(null);

	useEffect(() => {
		const handlePasswordReset = async (): Promise<void> => {
			const request = await userService.verificationConfirm({
				email: searchParams.get('email'),
				token: searchParams.get('token'),
			});

			setMessage(request?.message ?? 'Confirmation request failed, ');
		};

		handlePasswordReset();
	}, []);

	return (
		<div className={authDivWrapper}>
			<NavLink className={absoluteLeft} to={ROUTER_KEYS.ROOT}>
				<Button
					text="Main"
					icon={
						<AimpointsTarget
							size={22}
							color={themeColors.additional}
						/>
					}
					extraButtonStyles={headerMainLink}
				/>
			</NavLink>
			{!message ? (
				<Loader />
			) : (
				<>
					<p>{message}</p>
					<NavLink className={underline} to={ROUTER_KEYS.LOGIN}>
						<span>Follow to login Page</span>
					</NavLink>
				</>
			)}
		</div>
	);
};

export { AuthConfirmPage };
