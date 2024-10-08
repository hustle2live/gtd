import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
	authFormSection,
	authDivWrapper,
	headingAuthWrapper,
} from './auth.styles';
import { SignIn } from './sign-in.component';
import { SignUp } from './sign-up.component';
import { ROUTER_KEYS } from '~shared/keys';

import { ResetPasswordForm } from './reset-form.component';
import Button from '../button/button.component';
import { AimpointsTarget } from '@blueprintjs/icons';
import { themeColors } from '~shared/styles';
import { headerMainLink } from '../header/header-main-link.styles';

const Heading = (): JSX.Element => {
	const navigate = useNavigate();
	return (
		<div className={headingAuthWrapper}>
			<Button
				text="Main"
				onClick={() => navigate(ROUTER_KEYS.ROOT)}
				icon={
					<AimpointsTarget size={22} color={themeColors.additional} />
				}
				extraButtonStyles={headerMainLink}
			/>

			<h2>Welcome to app</h2>
			<p>Reactive Getting Things Done - Todo App</p>
		</div>
	);
};

const AuthScreen: React.FunctionComponent = (): JSX.Element => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const setFormScreen = (path: string): JSX.Element => {
		switch (path) {
			case ROUTER_KEYS.LOGIN: {
				return (
					<>
						<Heading />
						<SignIn />
					</>
				);
			}
			case ROUTER_KEYS.SIGN_UP: {
				return (
					<>
						<Heading />
						<SignUp />
					</>
				);
			}
			case ROUTER_KEYS.RESET_PASSWORD: {
				return (
					<>
						<Button
							text="Main"
							onClick={() => navigate(ROUTER_KEYS.ROOT)}
							icon={
								<AimpointsTarget
									size={22}
									color={themeColors.additional}
								/>
							}
							extraButtonStyles={headerMainLink}
						/>
						<ResetPasswordForm />
					</>
				);
			}
			case ROUTER_KEYS.RESET_PASSWORD_CONFIRM: {
				return <ResetPasswordForm confirm={true} />;
			}
			default: {
				return <></>;
			}
		}
	};

	return (
		<div className={authDivWrapper}>
			<section className={authFormSection}>
				{setFormScreen(pathname)}
			</section>
		</div>
	);
};

export { AuthScreen };
