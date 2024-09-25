import { css } from '@emotion/css';
import { colors, themeColors, themeFonts } from '~shared/styles';

const wrapper = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: left;
	margin: 20px;
	box-shadow: 3px 3px 3px #000;
	padding: 20px;
	border: 1px solid #c1c1c1;
	background-color: ${themeColors.background};

	p {
		font-size: 18px;
		font-weight: 600;
		&:hover {
			color: red;
			cursor: pointer;
		}
	}
`;

const title = css`
	font-family: ${themeFonts.primary.fontFamily};
	font-size: 20px;
	font-weight: 600;
	text-transform: uppercase;
	margin-bottom: 20px;
`;

const description = css`
	font-family: ${themeFonts.primary.fontFamily};
	min-height: 120px;

	.heading {
		font-size: 18px;
		fonr-weight: 400;
	}

	.text {
		font-size: 14px;
		font-weight: ${themeFonts.primary.fontWeight};
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
		font-weight: 12px;
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
	margin: 0 !important;
	width: auto !important;
	height: auto !important;
	padding: 10px 30px !important;
	border-radius: 4px !important;
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
	&:hover {
		background-color: ${colors.jacarta};
	}
	&:active {
		background-color: ${colors.bitterLemon};
	}
`;

export { wrapper, title, description, buttonsGroup, buttonElement, buttonBack };
