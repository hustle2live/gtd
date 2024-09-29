import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { ViteAliases } from 'vite-aliases';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
	root: './',
	build: {
		outDir: './dist',
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				nested: resolve(__dirname, 'index.html'),
			},
		},
	},
	plugins: [react(), svgr(), ViteAliases(), EnvironmentPlugin('all')],
});
