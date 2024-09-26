import { css } from '@emotion/css';
import { colors, themeColors, themeFonts } from '~shared/styles';

const wrapper = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: left;
	margin: 20px 0;
	padding: 20px;
	background-color: ${themeColors.background};
	width: 260px;
	height: 200px;
	position: relative;

	&.singleView {
		width: 100%;
		height: auto;
		background-color: ${themeColors.background};
		border-radius: 2px;
	}

	p {
		font-size: 18px;
		font-weight: 600;
		&:hover {
			color: red;
			cursor: pointer;
		}
	}

	@media screen and (max-width: 1020px) {
		div,
		p,
		button {
			font-size: 16px;
		}
	}
	@media screen and (max-width: 460px) {
		div,
		p,
		button {
			font-size: 14px;
		}
	}
`;

const title = css`
	font-family: ${themeFonts.primary.fontFamily};
	font-size: 20px;
	font-weight: 600;
	text-transform: capitalize;
	margin-bottom: 20px;

	&.singleView {
		font-size: 24px;
		margin-bottom: 40px;
	}

	@media screen and (max-width: 1020px) {
		font-size: 17px;
		font-weight: 500;
	}

	@media screen and (max-width: 460px) {
		margin-bottom: 10px;
		font-size: 16px;

		&.singleView {
			font-size: 18px;
		}
	}
`;

const description = css`
	height: 80px;

	.heading {
		font-size: 12px !important;
		font-weight: 400;
		margin: 20px 0 10px;
	}

	.text {
		text-transform: capitalize;
		font-size: 14px;
		font-weight: 400;
	}

	@media screen and (max-width: 1020px) {
		.heading {
			font-size: 15px;
		}
		.text {
			font-size: 13px;
		}
	}
	@media screen and (max-width: 460px) {
		.heading {
			font-size: 13px;
			letter-spacing: 0.5px;
		}

		.text {
			font-family: ${themeFonts.primary.fontFamily};
			font-weight: 400 !important;
			font-size: 11px;
			letter-spacing: 0.2px;
		}
	}
`;

const buttonsGroup = css``;

const buttonElement = css`
	display: flex;
	justify-content: space-between;
	margin: 10px 0;
	button {
		margin: 0;
		padding: 5px 12px;
		font-size: 12px;
		justify-self: flex-end;
		border-radius: 4px;
		border: 0px;
		cursor: pointer;
		&:hover {
			background-color: ${colors.violetRYB};
			color: ${colors.white};
		}
		&:active {
			background-color: ${colors.spaceCadet};
		}
	}
`;

const buttonBack = css`
	&.bp5-button {
		margin: 0 !important;
		font-size: 12px !important;
		line-height: 12px !important;
		font-weight: 400;
		cursor: pointer;
		min-height: unset;
		padding: 3px 75px !important;

		&:hover {
			background-color: ${colors.jacarta};
		}
		&:active {
			background-color: ${colors.bitterLemon};
		}

		@media screen and (max-width: 768px) {
			padding: 3px 35px !important;
		}

		@media screen and (max-width: 460px) {
			padding: 3px 15px !important;
			font-size: 11px !important;
			line-height: 11px !important;
		}
	}
`;

export { wrapper, title, description, buttonsGroup, buttonElement, buttonBack };
