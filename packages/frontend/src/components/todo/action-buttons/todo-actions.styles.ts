import { css } from '@emotion/css';

export const stylesWrapper = css`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	height: 40px;
	gap: 4px;

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
	align-items: center;
	margin: auto 0;
	height: 100%;
	@media screen and (max-width: 460px) {
		height: 18px;
		width: auto;
	}
`;
export const switchElem = css`
	justify-self: center;
	align-self: center;
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
		position: absolute;
		top: 10px;
		right: 10px;
		opacity: 0.5;

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
