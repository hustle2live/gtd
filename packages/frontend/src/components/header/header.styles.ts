import { css } from '@emotion/css';
import { themeColors } from '~shared/styles';

export const headerWrapperStyles = css`
	display: flex;
	justify-content: flex-end;
	gap: 20px;
	padding: 24px;

	@media screen and (max-width: 460px) {
		padding: 0px;
		margin: 12px 20px 18px;
		gap: 8px;
		justify-content: space-between;
	}
`;

export const headingButtonStyles = css`
	border-radius: 4px !important;
	background-color: ${themeColors.secondary} !important;
	color: ${themeColors.onSecondary};
	padding: 10px !important;
	width: auto !important;
	font-size: 14px;
	margin: 0;
	cursor: pointer;
	border: 1px solid transparent !important;

	&:hover {
		color: ${themeColors.secondary};
		background-color: ${themeColors.onSecondary} !important;
		border: 1px solid ${themeColors.primary} !important;
	}
	&:active {
		background-color: ${themeColors.onTertiaryContainer};
		border: 1px solid #000000 !important;
		box-shadow: 0 2px 2px #e5e5e5;
	}

	@media screen and (max-width: 1020px) {
		font-size: 11px;
		padding: 8px 10px !important;
	}

	@media screen and (max-width: 460px) {
		border-radius: 2px !important;
		font-size: 10px;
		font-weight: 400;
		padding: 2px 8px !important;
		min-width: 60px;
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
