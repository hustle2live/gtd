import React, { useContext } from 'react';

import { ThemeContext, ThemeProps } from './theme-context';

const useTheme = (): ThemeProps => {
	return useContext(ThemeContext);
};

export { useTheme };
