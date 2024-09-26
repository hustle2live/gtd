import { css } from '@emotion/css';
import { colors, themeColors, themeFonts } from '~shared/styles';

export const singleViewContainer = css`
	display: flex;
	gap: 50px;
	min-height: 90vh;
	height: auto;
	flex-direction: column;
	justify-content: center;
	align-items: left;
	padding: 20px;
`;

export const stylesWrapper = css`
	display: flex;
	flex-direction: column;
	align-content: space-between;
	gap: 10px;
	margin: 40px 0;

	@media screen and (max-width: 460px) {
		width: 100%;
		justify-content: space-between;
	}
`;

export const stylesButton = css`
	width: 64px;
	font-size: 14px;

	@media screen and (max-width: 1020px) {
		&.bp5-button {
			font-size: 12px;
			height: auto;
			padding: 2px 10px;
			width: auto;
			min-height: unset;
		}
		margin-right: 10px;
		box-shadow: 2px 2px 3px #000 !important;
	}

	@media screen and (max-width: 460px) {
		font-size: 10px !important;
		height: auto !important;
		min-width: 50px !important;
		padding: 2px 10px !important;
	}
`;

export const switchGroup = css`
	display: flex;
	justify-content: space-between;
	margin: 0px 60px;

	@media screen and (max-width: 768px) {
		margin: 0px 40px;
	}
	@media screen and (max-width: 460px) {
		margin: 0px;
	}
`;

export const switchElem = css`
	margin: auto 0;
	@media screen and (max-width: 460px) {
		height: auto;

		min-height: unset;
		margin: 0 !important;

		&.bp5-control,
		.bp5-control-indicator {
			width: 30px !important;
			min-width: unset !important;
			height: auto !important;
			min-height: 14px !important;
		}

		.bp5-control-indicator::before {
			height: 12px !important;
			width: 12px !important;
			margin: 1px 2px !important;
		}
	}
`;
export const moderate = css`
	position: absolute;
	top: 5%;
	right: 5%;
	opacity: 0.5;

	&:hover {
		opacity: 1;
	}
	&.bp5-button {
		background: transparent !important;
		box-shadow: 0 0 0 !important;
		border: none !important;
		outline: none !important;
	}

	.bp5-icon svg {
		&:active,
		&:hover {
			fill: orange;
		}
	}

	@media screen and (max-width: 1020px) {
		&.bp5-button {
			min-height: unset;
			min-width: unset;
			padding: 2px 0;
			width: 24px;
			height: 24px;
		}
	}

	@media screen and (max-width: 460px) {
		&.bp5-button {
			min-height: unset;
			padding: 2px 0;
			width: 20px;
			min-width: unset;
		}
		.bp5-icon svg {
			height: 12px;
			width: 12px;
		}
	}
`;

export const actionLabel = css`
	font-size: 12px !important;
	font-weight: 400;
	margin: 20px 0 10px;

	@media screen and (max-width: 1020px) {
		font-size: 15px;
	}
	@media screen and (max-width: 460px) {
		font-size: 13px;
		letter-spacing: 0.5px;
	}
`;
