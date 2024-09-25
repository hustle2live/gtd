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
`;

export const tabButton = css`
	border-right: 1px solid #000 !important;
	padding: 0px 25px;
`;

export const mockStyles = (
	horizontal: boolean = false,
): {
	listWrapper: string;
	ulStyles: string;
} => {
	const mockUpDirection = horizontal ? 'row' : 'column';
	const maxWidth = horizontal ? '80vw' : '100vw';

	return {
		listWrapper: css`
			position: relative;
			overflow: hidden;
			display: flex;
			flex-direction: ${mockUpDirection};
		`,

		ulStyles: css`
			display: flex;
			flex-wrap: nowrap;
			flex-direction: ${mockUpDirection};
			overflow: scroll;
			position: relative;
			max-width: ${maxWidth};
			max-height: 80vh;
		`,
	};
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
		min-height: 80vh;
		margin: auto;
		gap: 20px;
		max-width: 90vw;
		flex-wrap: wrap;
		justify-content: flex-start;
		overflow: hidden;
		height: 100%;
		flex-wrap: nowrap;
	`,

	tabs: css`
		min-width: 100vw;
		width: auto;
		display: flex;
		justify-content: space-between;
		gap: 10px;
		margin-top: 20px;
		flex-wrap: wrap;
		background: #ffffff;
		z-index: 99;
	`,

	list: css`
		margin-top: 0px;
		max-height: 88vh;
		overflow: scroll;

		& ul::-webkit-scrollbar {
			width: 0px !important;
			display: none !important;
		}
	`,
};
