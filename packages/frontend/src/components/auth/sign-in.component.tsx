import React, { useCallback } from 'react';

import { IUserRegisterDto } from '~shared/types/user/user.types';
import { AuthForm } from './form.component';
import { todosStore } from '~store/todos.store';
import { SubmitHandler } from 'react-hook-form';
import { UserModel } from '~/api/models/user.model';
import { userService } from '~/api/services/user.service';

const SignIn: React.FunctionComponent = (): JSX.Element => {
	const onLogin = todosStore(({ onLogin }) => onLogin);

	const handleLogin: SubmitHandler<IUserRegisterDto> = useCallback<
		SubmitHandler<IUserRegisterDto>
	>(async (payload: IUserRegisterDto): Promise<void> => {
		const { email, password } = payload;
		const userData: UserModel = await userService.login({
			email,
			password,
		});
		if (!userData.token || !userData.id) {
			console.error('not authorized');
		}
		onLogin(userData);
	}, []);

	return <AuthForm onSubmit={handleLogin} />;
};

export { SignIn };
