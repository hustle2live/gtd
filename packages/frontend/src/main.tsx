import React from 'react';
import ReactDOM from 'react-dom/client';
import { PortalProvider } from '@blueprintjs/core';
import { App } from '~modules/app/app.module';
import { ThemeProvider } from '~shared/styles';

import '@blueprintjs/core/lib/css/blueprint.css';

import 'normalize.css/normalize.css';

import './shared/styles/global-styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<PortalProvider portalClassName="my-custom-class">
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</PortalProvider>,
);
