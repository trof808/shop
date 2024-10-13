import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		setupFiles: ['./setup.vitest.ts'],
		environment: 'jsdom',
	},
	resolve: {
		alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
	},
});
