import React, { useCallback, useState } from 'react';

import { IUserFormRegister } from '~shared/types/user/user.types';
import { AuthForm } from './form.component';
import { SubmitHandler } from 'react-hook-form';
import { userService } from '~/api/services/user.service';

const SignUp: React.FunctionComponent = () => {
	const [message, setMessage] = useState('');

	const handleRegister: SubmitHandler<IUserFormRegister> = useCallback<
		SubmitHandler<IUserFormRegister>
	>(async (payload: IUserFormRegister): Promise<void> => {
		const { email, password } = payload;

		const request = await userService.register({
			email,
			password,
		});

		setMessage(request?.message);
	}, []);

	return <AuthForm onSubmit={handleRegister} showMessage={message} />;
};

export { SignUp };
