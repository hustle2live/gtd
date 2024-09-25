import { css } from '@emotion/css';

export const inputStyles = css`
	margin: 10px 0;
	width: 200px;
`;

export const wrapperStyles = css`
	max-width: 80%;
	max-height: 80%;
	margin: auto;
`;

export const profileImage = css`
	width: 100px;
	height: 120px;
	overflow: hidden;
	margin: 10px 0;
	& img {
		width: 100%;
		height: auto;
	}
`;

export const cardStyles = css`
	margin: 0;
	border: 1px solid white;
	box-shadow: 0 0 0 !important;
	outline-color: transparent;
	width: 400px;
	max-width: 100%;
`;
