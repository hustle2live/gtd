import React, { useState } from 'react';
import { Button, Card, Elevation, InputGroup } from '@blueprintjs/core';
import { todosStore } from '~store/todos.store';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';
import { userService } from '~/api/services/user.service';
import {
	cardStyles,
	inputStyles,
	profileImage,
	wrapperStyles,
} from './profile.styles';

import Image from '../../assets/Bender-1.jpg';

const ProfilePage = (): JSX.Element => {
	const { userName, userEmail, userId, updateUser } = todosStore(
		({ userName, userEmail, userId, updateUser }) => {
			return { userName, userEmail, userId, updateUser };
		},
	);

	const navigate = useNavigate();

	const [editable, setEditable] = useState(false);
	const [name, setName] = useState(userName);
	const [email, setEmail] = useState(userEmail);

	const handleEditProfile = async (): Promise<void> => {
		if (
			confirm(
				`Confirm changes saving name as ${name}, email as ${email} ?`,
			)
		) {
			const userData = { name: name, email: email };
			const newUser = await userService.updateData(userId, userData);
			if (newUser) {
				updateUser(newUser);
			}
		}
		setEditable(false);
	};

	return (
		<Card
			className={wrapperStyles}
			interactive={true}
			elevation={Elevation.TWO}
		>
			<h2>
				<a href="#">Profile page</a>
			</h2>
			<div className={profileImage}>
				<img src={Image} alt="profile image" />
			</div>
			<p>
				<span>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Blanditiis id, rem impedit ea temporibus optio quos omnis
					illo nostrum deserunt. Provident quasi quam tenetur, eveniet
					maiores minus itaque possimus totam?
				</span>
			</p>

			<Card
				className={cardStyles}
				interactive={false}
				elevation={Elevation.ZERO}
			>
				<p>Profile name: </p>
				<h5>{userName}</h5>
				<hr />
				<br />
				<InputGroup
					hidden={!editable}
					className={inputStyles}
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<p>Profile email: </p>
				<h5>{userEmail}</h5>
				<hr />
				<InputGroup
					hidden={!editable}
					className={inputStyles}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</Card>

			<Button onClick={() => navigate(ROUTER_KEYS.DASHBOARD)}>
				Back
			</Button>

			<Button
				hidden={editable}
				onClick={() => {
					setEditable(!editable);
				}}
			>
				Edit profile
			</Button>
			<Button hidden={!editable} onClick={() => setEditable(false)}>
				Cancel
			</Button>
			<Button hidden={!editable} onClick={handleEditProfile}>
				Save
			</Button>
		</Card>
	);
};

export { ProfilePage };
