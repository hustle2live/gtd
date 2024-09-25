import { css } from '@emotion/css';
import { themeColors } from '~shared/styles';

export const headerMainLink = css`
	position: absolute;
	left: 5%;
	top: 5%;
	border-radius: 12px !important;
	width: 100px !important;
	height: 44px !important;
	color: ${themeColors.additional} !important;
	font-size: 12px !important;
	background-color: transparent !important;
	background: transparent !important;
	border: 2px solid transparent !important;
	padding: 6px;
	box-sizing: border-box;
	overflow: visible;
	box-shadow: 0 0 0px #c1c1c1;
	transition: all 300ms;

	&:hover {
		cursor: pointer;
		text-decoration: underline;
	}
	&:active {
		cursor: pointer;
	}
`;
