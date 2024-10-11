import { css } from '@emotion/css';
import { themeColors } from '~shared/styles';

export const loaderStyles = css`
	position: absolute;
	width: 45px;
	height: 45px;
	border: 4px solid ${themeColors.additional};
	border-top: 4px solid transparent;
	border-radius: 50%;
	animation: rotate 1.2s infinite linear;
	z-index: 999;
	transform: translate(50%, 50%);
	top: 50%;
	left: 50%;
`;
