import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { ViteAliases } from 'vite-aliases';
import EnvironmentPlugin from 'vite-plugin-environment';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/gtd/',
	plugins: [
		react(),
		svgr(),
		ViteAliases(),
		EnvironmentPlugin('all'),
		tsconfigPaths(),
	],
});
