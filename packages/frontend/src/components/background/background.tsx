import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { BGWorkSpace, BGStripes } from './background.styles';

export const BackgroundStripes: React.FC = () => (
	<div className={BGStripes}></div>
);

export const BackgroundWorkspace: React.FC = () => {
	const bgWrapperRef = useRef(null);

	const [clientX, setClientX] = useState(0);
	const [clientY, setClientY] = useState(0);

	useEffect(() => {
		function onMouseMove(clientX?: number, clientY?: number): void {
			setClientX(clientX);
			setClientY(clientY);
		}

		document.addEventListener(
			'mousemove',
			({
				clientX,
				clientY,
			}: Pick<
				MouseEvent<HTMLDivElement, MouseEvent>,
				'clientX' | 'clientY'
			>) => onMouseMove(clientX, clientY),
		);

		return document.removeEventListener('mousemove', () => onMouseMove());
	}, []);

	return (
		<div ref={bgWrapperRef} className={BGWorkSpace(clientX, clientY)}>
			{/* <div className="gradient"></div> */}
		</div>
	);
};
