import { css } from '@emotion/css';
import { themeColors } from '~shared/styles';

export const sliderWrapper = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	position: relative;
	overflow: hidden;
	height: 80vh;
	width: 700px;
	max-height: 90vh;
	max-width: 90vw;
	margin: 0;
	transition: all 1s;
`;

export const ulListWrapper = (posX = 0, gap = 40): string => css`
	display: flex;
	box-sizing: border-box;
	flex-wrap: nowrap;
	flex-direction: row;
	width: 100%;
	height: auto;
	width: auto;
	padding: 0 40px;
	gap: ${gap}px;
	transition: all 1s;
	transform: translateX(${posX}px);
`;

export const todoItemDiv = css`
	width: 400px;
	box-sizing: border-box;
	height: 340px;
	margin: 0;
	padding: 20px;
	background-color: ${themeColors.background};
	box-shadow: 4px 12px 23px #c1c1c1c1;
`;

export const sliderButtons = css`
	position: absolute;
	top: 50%;
	width: 50px;
	height: 50px;
	left: 0;
	z-index: 10;
`;

export const buttonRight = css`
	${sliderButtons}
	left: unset;
	right: 0;
`;
