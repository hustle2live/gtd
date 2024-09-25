import React from 'react';
import * as Blueprint from '@blueprintjs/core';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { ROUTER_KEYS } from '~shared/keys';
import {
	IUserFormRegister,
	IUserRegisterDto,
} from '~shared/types/user/user.types';
import { regexEmail } from '~shared/helpers/helpers';
import { themeColors } from '~shared/styles';
import InputCustom from './input.component';
import { flexBetween, navigationLink } from '../root-page/root.styles';
import { formElement, inputGroupElement, mb20 } from './auth.styles';

type Props = {
	onSubmit: (payload: IUserFormRegister | IUserRegisterDto) => void;
	showMessage?: string;
};

const AuthForm: React.FunctionComponent<Props> = ({
	onSubmit,
	showMessage = '',
}) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const isSignUpPage = pathname === ROUTER_KEYS.SIGN_UP;

	const { register, handleSubmit } = useForm<
		IUserFormRegister | IUserRegisterDto
	>({
		mode: 'onChange',
	});

	return (
		<>
			<form className={formElement} onSubmit={handleSubmit(onSubmit)}>
				<div className={inputGroupElement}>
					<Blueprint.Label>Email</Blueprint.Label>
					<InputCustom
						name="email"
						type="email"
						handleRegister={register || null}
						patternExpression={{
							value: regexEmail,
							message: 'Please enter a valid email',
						}}
					/>
				</div>
				<div className={inputGroupElement}>
					<Blueprint.Label>Password</Blueprint.Label>
					<InputCustom
						name="password"
						handleRegister={register || null}
						minLength={3}
					/>
				</div>
				{isSignUpPage && (
					<div className={inputGroupElement}>
						<Blueprint.Label>Confirm password</Blueprint.Label>
						<InputCustom
							name="passwordConfirm"
							validation={(
								value: string,
								formValues: IUserFormRegister,
							) => formValues.password === value}
							isDisabled={!isSignUpPage}
							handleRegister={register || null}
							isRequired={isSignUpPage}
						/>
					</div>
				)}
				<div className={flexBetween}>
					<Blueprint.Button
						text="Back"
						className={mb20}
						onClick={() => navigate(ROUTER_KEYS.ROOT)}
					/>
					<Blueprint.Button
						type="submit"
						text="Submit"
						intent={Blueprint.Intent.PRIMARY}
						className={mb20}
					/>
				</div>
			</form>
			<Blueprint.Label color={themeColors.error}>
				{showMessage}
			</Blueprint.Label>
			<NavLink
				className={navigationLink}
				to={isSignUpPage ? ROUTER_KEYS.LOGIN : ROUTER_KEYS.SIGN_UP}
			>
				{isSignUpPage
					? 'Already with us? - go to Login page...'
					: 'Have no account? - so, get Sign Up :)'}
			</NavLink>
		</>
	);
};

export { AuthForm };
