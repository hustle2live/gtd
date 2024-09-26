import { css } from '@emotion/css';
import { themeColors } from '~shared/styles';

export const tableStyles = css`
	margin: 0 auto;
	min-height: 400px;
	margin-bottom: 20px;
`;

export const paginationStyles = css`
	margin: 0 auto;
	margin-bottom: 20px;
`;

export const mg20 = css`
	margin: 20px;
`;

export const mw85 = css`
	max-width: 85vw;
`;

export const tabsContainer = css`
	box-shadow: 3px 2px 2px #000;
	border: 1px solid #000 !important;
	border-radius: 2px;

	.bp5-tab-list {
		column-gap: 0;
		height: auto !important;
		width: auto !important;
	}

	.bp5-tab[aria-selected='true'] {
		background-color: ${themeColors.additional_light} !important;
		color: #fff !important;
	}

	@media screen and (max-width: 1060px) {
		line-height: 18px;
		height: 28px;

		.bp5-tab {
			font-size: 16px !important;
			line-height: 18px;
			padding: 4px 18px;
			height: auto;
		}
	}

	@media screen and (max-width: 1020px) {
		height: 24px;

		.bp5-tab {
			font-size: 13px !important;
			line-height: 16px;
			padding: 3px 16px;
		}
	}

	@media screen and (max-width: 460px) {
		height: 22px;

		.bp5-tab-list {
			max-width: 100%;
		}

		.bp5-tab {
			font-size: 11px !important;
			line-height: 14px;
			padding: 3px 14px;
		}
	}
`;

export const tabButton = css`
	border-right: 1px solid #000 !important;
	padding: 0px 25px;
`;

export const mockStyles = {
	listWrapper: css`
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	`,

	ulStyles: css`
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column;
		overflow: scroll;
		position: relative;
		max-width: 100%;
		max-height: 80vh;
	`,
};

export const stylesDefault = {
	wrapper: css`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		margin: auto;
		align-self: center;
		justify-self: center;
		gap: 20px;
		max-width: 90vw;

		@media screen and (min-width: 1024px) {
			max-width: 920px;
		}
		@media screen and (min-width: 1440px) {
			max-width: 1150px;
		}
		@media screen and (min-width: 1920px) {
			max-width: 1390px;
		}

		@media screen and (max-width: 1020px) {
			.bp5-input-group input,
			.bp5-input-group input::placeholder {
				font-size: 12px;
				line-height: 18px;
				padding-bottom: 2px;
				height: 25px;
			}

			.bp5-input-group {
			}
			.search-icon {
				margin: 6px !important;
			}
			.bp5-button.bp5-minimal,
			.search-icon svg {
				margin: 0;
				height: 14px !important;
				width: 14px !important;
			}
		}
	`,
	tabs: css`
		width: 100%;
		display: flex;
		justify-content: space-between;
		gap: 10px;
	`,
	list: css`
		margin-top: 0px;
		max-height: 88vh;
		overflow: scroll;
	`,
};

export const stylesMobile = {
	wrapper: css`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: 900px;
		margin: auto;
		gap: 10px;
		max-width: 90vw;
		flex-wrap: wrap;
		justify-content: flex-start;
		overflow: hidden;
		height: 100%;
		flex-wrap: nowrap;

		@media screen and (max-width: 460px) {
			max-width: 100%;
			margin: 0 20px;

			.bp5-input-group input,
			.bp5-input-group input::placeholder {
				font-size: 11px;
				height: 22px;
				padding-top: 1px;
				padding-bottom: 1px;
			}

			.bp5-input-group {
				margin: 0;
				width: 160px;
				font-size: 11px;
			}

			.search-icon {
				margin: 6px !important;
			}

			.bp5-button.bp5-minimal,
			.search-icon svg {
				font-size: 11px;
				margin: 0;
				height: 12px !important;
				width: 12px !important;
			}
		}
	`,

	tabs: css`
		width: auto;
		display: flex;
		justify-content: space-between;
		gap: 10px;
		margin-top: 20px;
		flex-wrap: wrap;
		background: #ffffff;
		z-index: 99;

		@media screen and (max-width: 460px) {
			flex-direction: column-reverse;
			margin: 0;
		}
	`,

	list: css`
		margin-top: 0px;
		max-height: 88vh;

		& ul::-webkit-scrollbar {
			width: 0px !important;
			display: none !important;
		}
	`,
};
