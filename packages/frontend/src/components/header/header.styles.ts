import { css } from '@emotion/css';
import { themeColors } from '~shared/styles';

export const headerWrapperStyles = css`
	display: flex;
	justify-content: flex-end;
	gap: 20px;
	padding: 24px;
`;

export const headingButtonStyles = css`
	border-radius: 4px !important;
	background-color: ${themeColors.secondary} !important;
	color: ${themeColors.onSecondary};
	padding: 10px !important;
	width: auto !important;
	font-size: 10px;
	margin: 0;
	cursor: pointer;
	border: 1px solid transparent !important;

	&:hover {
		color: ${themeColors.secondary};
		background-color: ${themeColors.onSecondary} !important;
		border: 1px solid ${themeColors.primary} !important;
		padding: 10px !important;
	}
	&:active {
		background-color: ${themeColors.onTertiaryContainer};
		border: 1px solid #000000 !important;
		box-shadow: 0 2px 2px #e5e5e5;
		padding: 10px !important;
	}
`;

export const logoutButton = css`
	${headingButtonStyles};

	background-color: ${themeColors.onSurface} !important;
	color: ${themeColors.onTertiaryContainer};
	justify-content: space-between;
	border-radius: 4px;

	&:hover {
		background-color: ${themeColors.onPrimaryContainer} !important;
		color: ${themeColors.onSurface} !important;
		border: 1px solid #000000;
	}
	&:active {
		background-color: ${themeColors.onSecondaryContainer};
		border: 1px solid #000000;
	}
`;
