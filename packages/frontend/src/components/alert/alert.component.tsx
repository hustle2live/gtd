import React, { FunctionComponent, useEffect, useState } from 'react';

import { alert, closebtn, hidden } from './alert.styles';

type AlertProps = {
	isShown?: boolean;
	text?: string | JSX.Element;
	onClick?: (item: unknown) => void;
};

const AlertComponent: FunctionComponent<AlertProps> = ({
	isShown = false,
	text = '',
	onClick,
}): JSX.Element => {
	const [isVisible, setIsVisible] = useState<boolean>(isShown);
	const isHidden = !isVisible ? hidden : '';
	const toggleAlert = (value = isVisible): void => setIsVisible(!value);
	const handleClick = onClick || toggleAlert;
	useEffect(() => {
		setIsVisible(isShown);
	}, [isShown]);

	return (
		<div className={`${alert} ${isHidden}`}>
			{text}
			<button className={closebtn} onClick={() => handleClick()}>
				&times;
			</button>
		</div>
	);
};

export { AlertComponent };
