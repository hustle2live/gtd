import { css } from '@emotion/css';

import abstract1 from '../../assets/bg/rb_left.png';
import abstract2 from '../../assets/bg/rb_right.png';

import abstractWorkspace from '../../assets/bg/5199419.jpg';

export const BGStripes = css`
	position: absolute;
	display: block;
	left: 0;
	top: 0;
	min-width: 100%;
	min-height: 100%;
	background-repeat: no-repeat;
	z-index: -1;
	background: #d9e0e0;

	&:before,
	&:after {
		position: absolute;
		width: 100%;
		height: 100%;
		content: '';
		display: block;
		left: 0;
		top: 0;
		background: transparent;
		background-image: url(${abstract1});
		background-size: contain;
		background-repeat: no-repeat;
		overflow: visible;
	}

	&:after {
		background-image: url(${abstract2});
		background-repeat: no-repeat;
		background-position: right bottom;
	}
`;

export const BGWorkSpace = (
	width = 300,
	height = 300,
	tintColor = '#4d4fa7',
) => {
	return css`
		position: absolute;
		padding: 0;
		margin: 0;
		min-width: 100%;
		min-height: 100%;
		background-image: url(${abstractWorkspace});
		background-repeat: no-repeat;
		background-size: cover;
		z-index: -1;
		left: 0;
		top: 0;

		.gradient {
			position: absolute;
			width: 100%;
			height: 100%;
			background-image: radial-gradient(
				at ${width}px ${height}px,
				rgba(159, 0, 191, 0.9) 0,
				${tintColor} 70%
			);
		}
	`;
};
