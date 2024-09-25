import React, { useState } from 'react';
import * as Blueprint from '@blueprintjs/core';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { IUserFormRegister } from '~shared/types/user/user.types';
import { formElement, inputGroupElement } from './auth.styles';
import { regexEmail } from '~shared/helpers/helpers';
import { userService } from '~/api/services/user.service';
import InputCustom from './input.component';
import {
	flexBetween,
	opacity80,
	relative,
	twoRowsLabel,
} from '../root-page/root.styles';
import { ROUTER_KEYS } from '~shared/keys';

type Props = {
	confirm?: boolean;
};

const ResetPasswordForm: React.FunctionComponent<Props> = ({
	confirm = false,
}) => {
	const textInitial = !confirm
		? 'Password reseting '
		: 'Confirm password reseting ';
	const [searchParams] = useSearchParams();
	const [message, setMessage] = useState(textInitial);
	const navigate = useNavigate();

	const { register, handleSubmit } = useForm<Partial<IUserFormRegister>>({
		mode: 'onChange',
	});

	const resetPasswordRequest = async (
		payload: Pick<IUserFormRegister, 'email'>,
	): Promise<void> => {
		const request = await userService.passwordReset({
			email: payload.email,
		});
		setMessage(request?.message);
	};

	const confirmNewPassword = async (
		payload: Pick<IUserFormRegister, 'password'>,
	): Promise<void> => {
		const params = {
			email: searchParams.get('email'),
			token: searchParams.get('token'),
		};

		if (!params.email || !params.token) {
			return setMessage('Not valid query');
		}

		const request = await userService.verificationConfirm({
			...params,
			password: payload.password,
		});

		setMessage(request?.message);
	};

	const onSubmit = !confirm ? resetPasswordRequest : confirmNewPassword;

	return (
		<div className={relative}>
			<form className={formElement} onSubmit={handleSubmit(onSubmit)}>
				<Blueprint.Label className={`${opacity80} ${twoRowsLabel}`}>
					{message}
				</Blueprint.Label>
				{!confirm ? (
					<div className={inputGroupElement}>
						<Blueprint.Label>Type in your Email</Blueprint.Label>
						<InputCustom
							name="email"
							handleRegister={register}
							patternExpression={{
								value: regexEmail,
								message: 'Please enter a valid email',
							}}
							type="email"
							isRequired={!confirm}
						/>
					</div>
				) : (
					<>
						<div className={inputGroupElement}>
							<Blueprint.Label>
								Type in new password
							</Blueprint.Label>
							<InputCustom
								name="password"
								handleRegister={register}
								isRequired={confirm}
							/>
						</div>
						<div className={inputGroupElement}>
							<Blueprint.Label>
								Confirm new password
							</Blueprint.Label>
							<InputCustom
								name="passwordConfirm"
								validation={(
									value: string,
									formValues: IUserFormRegister,
								) => formValues.password === value}
								handleRegister={register}
								isRequired={confirm}
							/>
						</div>
					</>
				)}
				<div className={flexBetween}>
					<Blueprint.Button
						outlined
						icon={'arrow-left'}
						intent={Blueprint.Intent.PRIMARY}
						text="Back"
						onClick={() => navigate(ROUTER_KEYS.ROOT)}
					/>
					<Blueprint.Button
						outlined
						rightIcon={'arrow-right'}
						intent={Blueprint.Intent.PRIMARY}
						type="submit"
						text="Submit"
					/>
				</div>
			</form>
		</div>
	);
};

export { ResetPasswordForm };
