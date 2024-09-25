import React from 'react';
import Button from '../button/button.component';
import {
	headerWrapperStyles,
	headingButtonStyles,
	logoutButton,
} from './header.styles';
import { todosStore } from '~store/todos.store';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';

const Header: React.FunctionComponent = () => {
	const logOut = todosStore((state) => state.onLogout);
	const navigate = useNavigate();

	return (
		<div className={headerWrapperStyles}>
			<Button
				text="My Profile"
				onClick={() => navigate(ROUTER_KEYS.PROFILE)}
				extraButtonStyles={headingButtonStyles}
			/>
			<Button
				text="Quit"
				extraButtonStyles={logoutButton}
				onClick={logOut}
			/>
		</div>
	);
};

export { Header };
