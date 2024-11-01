import { css } from '@emotion/css';

export const alert = css`
	padding: 10px 30px;
	background-color: #f44336;
	color: white;
	margin-bottom: 15px;
	position: absolute;
	top: 10%;
	left: 50vw;
	transform: translateX(-50%);
	p {
		max-width: 84%;
		text-align: left;
		margin: 0;
		padding: 14px 0;
	}
	.emoji {
		font-size: 20px;
	}

	@media screen and (max-width: 500px) {
		top: 20%;
		min-width: 74vw;
	}
`;

export const closebtn = css`
	position: absolute;
	right: 0;
	top: 0;
	color: black;
	font-size: 34px;
	line-height: 34px;
	cursor: pointer;
	transition: 0.3s;
	background-color: transparent;
	padding: 4px 10px;
	display: flex;
	border: none;
	align-self: flex-start;
	justify-self: flex-end;
	margin: 0;

	&:hover {
		color: gray;
	}
`;

export const hidden = css`
	display: none;
`;
