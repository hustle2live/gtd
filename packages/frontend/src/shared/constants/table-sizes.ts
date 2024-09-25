export const COLUMN_SIZES = {
	SMALL: [190, 250, 200], // 640px
	MEDIUM: [250, 350, 250], // 850px
	LARGE: [370, 480, 300], // 1150px
	EX_LARGE: [430, 560, 400], // 1390px
	DOUBLE_EX_LARGE: [600, 900, 600], // 2100px
};

export type SCREEN_SIZES = {
	M: boolean;
	L: boolean;
	XL: boolean;
	XXL: boolean;
};

export const getColumnSize = ({ M, L, XL, XXL }: SCREEN_SIZES): number[] => {
	switch (true) {
		case XXL:
			return COLUMN_SIZES.DOUBLE_EX_LARGE;
		case XL:
			return COLUMN_SIZES.EX_LARGE;
		case L:
			return COLUMN_SIZES.LARGE;
		case M:
			return COLUMN_SIZES.MEDIUM;
		default:
			return COLUMN_SIZES.SMALL;
	}
};
