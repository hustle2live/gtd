import { css } from '@emotion/css';

export const stylesWrapper = css`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	height: 40px;
	gap: 4px;
`;
export const stylesButton = css`
	width: 64px;
	font-size: 14px;
`;

export const switchGroup = css`
	display: flex;
	align-items: center;
	margin: auto 0;
	height: 100%;
`;
export const switchElem = css`
	justify-self: center;
	align-self: center;
	margin: auto 0;
`;
export const moderate = css`
	opacity: 0.5;
	&:hover {
		opacity: 1;
	}
`;
