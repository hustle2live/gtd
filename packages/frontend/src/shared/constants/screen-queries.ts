type ScreenDetectType = {
	readonly Mobile: {
		readonly maxWidth: number;
	};
	readonly Tablet: {
		readonly minWidth: number;
		readonly maxWidth: number;
	};
	readonly Desktop: {
		readonly minWidth: number;
	};
};

const Sizes = {
	mobileMax: 426,
	tabletMin: 426,
	tabletMax: 768,
	desktopMin: 769,
};

const ScreenParams: ScreenDetectType = {
	Mobile: { maxWidth: Sizes.mobileMax },
	Tablet: {
		minWidth: Sizes.tabletMin,
		maxWidth: Sizes.tabletMax,
	},
	Desktop: { minWidth: Sizes.desktopMin },
};

export { ScreenParams, Sizes, type ScreenDetectType };
