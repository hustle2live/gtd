import { css } from '@emotion/css';
import { themeColors } from '~shared/styles';

export const navigationLink = css`
	text-decoration: underline;
	color: ${themeColors.additional};
	font-weight: 500;
	&:hover {
		color: ${themeColors.tertiary};
	}
	&:active {
		opacity: 0.8;
		outline: none !important;
	}
`;

export const buttonStyles = css`
	width: 100px;
	padding: 11px 20px !important;
	box-shadow: 3px 3px 3px #000 !important;
	transition: 300ms;
	font-weight: 400;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 3px 3px 3px #c5c5c5 !important;
	}
	&:active {
		transform: translateY(1px);
		box-shadow: 3px 3px 3px #000 !important;
	}
`;

export const flexColumn = css`
	display: flex;
	flex-direction: column;
`;

export const flexCenter = css`
	justify-content: center;
	height: 100vh;
`;

export const rootWrapper = css`
	${flexColumn};
	position: relative;
	gap: 30px;
	text-align: center;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-height: 100vh;
	& p {
		margin: 10px 0 0;
	}
`;

export const buttonGroup = css`
	${flexColumn};
	margin-top: 60px;
	gap: 25px;
`;

export const buttonAddition = css`
	position: absolute;
	right: 5%;
	top: 5%;
`;

export const flexBetween = css`
	display: flex;
	justify-content: space-between;
`;

export const relative = css`
	position: relative;
`;

export const opacity80 = css`
	opacity: 0.8;
`;

export const twoRowsLabel = css`
	height: 2.58rem;
`;
