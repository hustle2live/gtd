type IThemeFontStyle = {
	primary: {
		fontFamily: string;
		fontSize: string;
		fontWeight: number;
		lineHeight: number;
	};
};

const themeFonts: IThemeFontStyle = Object.freeze({
	primary: {
		fontFamily: 'Roboto, sans-serif',
		fontSize: '16px',
		fontWeight: 400,
		lineHeight: 1.5,
	},
});

export { themeFonts, type IThemeFontStyle };
