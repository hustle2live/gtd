import React, { useState } from 'react';
import {
	Button,
	Card,
	Elevation,
	InputGroup,
	Intent,
	TextArea,
} from '@blueprintjs/core';
import { todosStore } from '~store/todos.store';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';
import { userService } from '~/api/services/user.service';
import {
	buttonGroup,
	cardStyles,
	inputStyles,
	profileDescription,
	profileImage,
	userEmailStyles,
	wrapperStyles,
} from './profile.styles';

import Image from '../../assets/Bender-1.jpg';
import { flexCenter, flexColumn } from '../root-page/root.styles';
import { themeColors } from '~shared/styles';

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
		<div className={`${flexColumn} ${flexCenter}`}>
			<Card
				className={wrapperStyles}
				interactive={true}
				elevation={Elevation.TWO}
			>
				<h4>
					<span>Profile page</span>
				</h4>
				<div className={profileImage}>
					<img src={Image} alt="profile image" />
				</div>
				<p>
					<p>About me:</p>
					<TextArea
						readOnly={!editable}
						className={profileDescription}
						fill={true}
						defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis id, rem impedit ea temporibus optio quos omnis illo nostrum deserunt. Provident quasi quam tenetur, eveniet maiores minus itaque possimus totam?"
					></TextArea>
				</p>

				<Card
					className={cardStyles}
					interactive={false}
					elevation={Elevation.ZERO}
				>
					<p>Profile name: </p>
					<h5>{userName}</h5>
					<hr />
					<InputGroup
						hidden={!editable}
						className={inputStyles}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<p className={userEmailStyles}>Profile email: </p>
					<h5>{userEmail}</h5>
					<hr />
					<InputGroup
						hidden={!editable}
						className={inputStyles}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Card>
				<div className={buttonGroup}>
					<Button
						hidden={editable}
						onClick={() => navigate(ROUTER_KEYS.DASHBOARD)}
					>
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
					<Button
						hidden={!editable}
						onClick={() => setEditable(false)}
						intent={Intent.WARNING}
					>
						Cancel
					</Button>
					<Button
						hidden={!editable}
						onClick={handleEditProfile}
						intent={Intent.PRIMARY}
					>
						Save
					</Button>
				</div>
			</Card>
		</div>
	);
};

export { ProfilePage };
