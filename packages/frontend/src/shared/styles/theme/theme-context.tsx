import React, { createContext, ReactNode } from 'react';

import { themeColors } from '../colors';
import { themeFonts, type IThemeFontStyle } from '../fonts';

interface ThemeProps {
	colors: typeof themeColors;
	fonts: IThemeFontStyle;
}

const ThemeContext = createContext<ThemeProps | undefined>(undefined);

const ThemeProvider: React.FunctionComponent<{ children: ReactNode }> = ({
	children,
}) => {
	const themeProps = {
		colors: themeColors,
		fonts: themeFonts,
	};

	return (
		<ThemeContext.Provider value={themeProps}>
			{children}
		</ThemeContext.Provider>
	);
};

export { ThemeProvider, ThemeContext, type ThemeProps };
