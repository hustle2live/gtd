type ScreenDetectType = {
	readonly Mobile: { readonly maxWidth: number };
	readonly Tablet: {
		readonly minWidth: number;
		readonly maxWidth: number;
	};
	readonly Desktop: { readonly minWidth: number };
	readonly DesktopM: { readonly minWidth: number };
	readonly DesktopL: { readonly minWidth: number };
	readonly DesktopXL: { readonly minWidth: number };
	readonly Desktop4K: { readonly minWidth: number };
};

const Sizes = {
	mobileMax: 489,
	tabletMin: 490,
	tabletMax: 768,
	laptopMin: 769,
	laptopMedMin: 1020,
	laptopLarMin: 1400,
	laptopXLMin: 1920,
	laptop4KMin: 2560,
};

const ScreenParams: ScreenDetectType = {
	Mobile: { maxWidth: Sizes.mobileMax },
	Tablet: {
		minWidth: Sizes.tabletMin,
		maxWidth: Sizes.tabletMax,
	},
	Desktop: { minWidth: Sizes.laptopMin },
	DesktopM: { minWidth: Sizes.laptopMedMin },
	DesktopL: { minWidth: Sizes.laptopLarMin },
	DesktopXL: { minWidth: Sizes.laptopXLMin },
	Desktop4K: { minWidth: Sizes.laptop4KMin },
};

export { ScreenParams, Sizes, type ScreenDetectType };
