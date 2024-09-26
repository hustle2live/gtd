import { css } from '@emotion/css';
import { themeColors } from '~shared/styles';

export const inputStyles = css`
	margin: 10px 0;
	width: 200px;
`;

export const wrapperStyles = css`
	max-width: 600px;
	width: 600px;
	margin: 10px auto 80px;

	h4 {
		color: ${themeColors.additional};
		text-decoration: underline;
	}

	@media screen and (max-width: 620px) {
		max-width: 90%;

		.bp5-input,
		.bp5-button {
			height: auto;
			width: auto;
			max-width: 80%;
			line-height: 12px;
			font-size: 12px;
			padding: 4px 10px;
			min-height: unset;
		}
	}
`;

export const profileImage = css`
	width: 100px;
	height: 120px;
	overflow: hidden;
	margin: 10px 0;
	& img {
		width: 100%;
		height: auto;
	}
`;
export const profileDescription = css`
	min-width: 100% !important;
	width: 100% !important;
	padding: 0;
	text-align: left;
	height: 80px !important;

	box-shadow: none !important;

	&:focus,
	&:active {
		box-shadow: 0px 0px 4px orange !important;
	}
`;

export const userEmailStyles = css`
	margin-top: 20px !important;
`;

export const cardStyles = css`
	margin: 0;
	padding: 10px 20px 30px !important;
	border: 1px solid white;
	box-shadow: 0 0 0 !important;
	outline-color: transparent;
	width: 300px;
	max-width: 100%;
`;

export const buttonGroup = css`
	display: flex;
	justify-content: space-between;
	margin-top: 30px;

	.bp5-button {
		box-shadow: 2px 2px 3px #000 !important;
	}

	@media screen and (max-width: 460px) {
		margin-top: 0;
	}
`;
