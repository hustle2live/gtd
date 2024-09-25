import { css } from '@emotion/css';
import { themeColors } from '~shared/styles';

export const authDivWrapper = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	min-height: 100vh;
	padding: 0;
`;

export const authFormSection = css`
	align-self: center;
	text-align: center;
	width: 100%;
	max-width: 450px;
	padding: 1rem;
	& input {
		width: 100%;
	}
`;

export const headingAuthWrapper = css`
	margin-bottom: 60px;
`;

export const formElement = css`
	display: flex;
	flex-direction: column;
	margin: 60px 0 20px;
	gap: 20px;
	position: relative;
`;

export const inputGroupElement = css`
	position: relative;
	width: 100%;

	label {
		margin-bottom: 0 !important;
		text-align: left;
		padding: 2px 0;
		font-size: 14px;
	}
`;

export const mb20 = css`
	margin: 0 0 20px;
	padding: 3px 16px !important;
	width: auto;
	box-shadow: 3px 3px 3px #c5c5c5 !important;
	&:hover {
		box-shadow: 3px 3px 3px #000 !important;
	}
`;

export const mauto20 = css`
	margin: auto;
	width: 20px;
	height: 20px;
`;

export const absoluteLeft = css`
	position: absolute;
	left: 40%;
	top: -100px;
`;

export const underline = css`
	text-decoration: underline;
`;
