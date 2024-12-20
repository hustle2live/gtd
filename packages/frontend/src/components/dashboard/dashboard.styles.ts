import { css } from '@emotion/css';
import { themeColors } from '~shared/styles';

export const dashboardWrapper = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100vh;
`;

export const addTodoButton = css`
	position: absolute;
	right: 12%;
	bottom: 15%;
	border-radius: 15% !important;
	border: none !important;
	box-shadow: 2px 2px 14px -7px ${themeColors.additional} !important;
`;
