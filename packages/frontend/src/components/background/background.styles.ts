import { css } from '@emotion/css';

import abstract1 from '../../assets/bg/rb_left.png';
import abstract2 from '../../assets/bg/rb_right.png';

export const BGWrapper = css`
	position: absolute;
	display: block;
	left: 0;
	top: 0;
	min-width: 100%;
	min-height: 100%;
	background-repeat: no-repeat;
	z-index: -1;

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
