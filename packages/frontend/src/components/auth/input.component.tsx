import React from 'react';
import { UseFormRegister, Validate, ValidationRule } from 'react-hook-form';
import {
	IUserFormRegister,
	IUserRegisterDto,
} from '~shared/types/user/user.types';

type InputProps = {
	name: 'password' | 'email' | 'passwordConfirm';
	isRequired?: boolean;
	isDisabled?: boolean;
	validation?:
		| ((value: string, formValues: IUserFormRegister) => boolean)
		| Validate<string, IUserFormRegister | IUserRegisterDto>
		| Record<
				string,
				Validate<string, IUserFormRegister | IUserRegisterDto>
		  >;
	placeholder?: string;
	type?: 'password' | 'text' | 'submit' | 'email';
	classNames?: string;
	minLength?: number;
	handleRegister?:
		| Partial<UseFormRegister<IUserRegisterDto | IUserFormRegister>>
		| any;
	patternExpression?: ValidationRule<RegExp>;
	autoComplete?: any;
};

const InputCustom: React.FunctionComponent<InputProps> = ({
	name,
	isRequired = true,
	isDisabled = false,
	validation,
	placeholder,
	type = 'password',
	classNames = 'bp5-input',
	minLength = 3,
	handleRegister,
	autoComplete,
	patternExpression,
}) => {
	return (
		<input
			className={classNames}
			disabled={isDisabled}
			{...handleRegister(name, {
				validate: validation,
				pattern: patternExpression,
			})}
			type={type}
			placeholder={placeholder}
			required={isRequired}
			minLength={minLength}
			autoComplete={autoComplete}
		/>
	);
};

export default InputCustom;
