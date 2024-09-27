import { css } from '@emotion/css';
import { themeColors } from '~shared/styles';

export const editContainer = css`
	position: absolute;
	width: 100%;
	left: 0;
	top: 0;
	margin: 0;
	transform: translate(0%, 0%);
`;

export const inputStyles = css`
	width: 100% !important;

	&.bp5-text-area {
		height: 120px;
		margin-bottom: 20px;
		font-size: 12px;
	}
`;

export const wrapperStyles = css`
	// max-width: 600px;
	// width: 600px;
	margin: 0 auto;

	h4 {
		color: ${themeColors.additional};
		text-decoration: underline;
		margin: 10px 0;
	}

	h5 {
		margin: 10px 0;
	}

	@media screen and (max-width: 620px) {
		width: auto;
		max-width: 95%;

		.bp5-button {
			height: auto;
			width: auto;
			max-width: 92%;
			line-height: 12px;
			font-size: 12px;
			padding: 4px 10px;
			min-height: unset;
		}
	}
`;

export const userEmailStyles = css`
	margin-top: 20px !important;
`;

export const cardStyles = css`
	margin: 0;
	padding: 0px !important;
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
